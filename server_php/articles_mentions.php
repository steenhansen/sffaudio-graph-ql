<?php

require( dirname( __FILE__ ) . '/wp-load.php' );

/*
  http://www.sffaudio.com/articles_mentions.php?search_text=philip%20K.%20dick
  Will output all matching posts to JSON.
  Is called from https://sffaudio-graphql.herokuapp.com
  Is not used in http://www.sffaudio.com
  May be empty as in  { "posts": [] }
*/

//ini_set('display_errors',1);
//ini_set('display_startup_errors',1);
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

define("NO_LIMIT_POSTS", 1000);
define("LIMIT_POSTS", 50);
define("LIMIT_TAGS", 50);
define("AT_LEAST_CHARACTERS", 3);
define("VALID_CHARACTERS", "a-zA-Z0-9 .");

function postsToJson($matching_posts){
    $json_output = <<<EOT
{ "posts": [ $matching_posts ] }
EOT;
    return $json_output;
}

function matchingPosts($post_sql, $home_url, $post_name, $limit_records){
    global $wpdb;

    $matching_posts = [];
    $limited_sql = " $post_sql LIMIT $limit_records";
    $post_titles = $wpdb->get_results($limited_sql);
    foreach ($post_titles as $a_post) {
        $ID = $a_post->ID;
        $title = $a_post->post_title;
        $link = $home_url . $a_post->post_name;
        $data = ['ID'=> $ID, 'headline'=>$title, $post_name=>$link];
        $json_post = json_encode($data);
        $matching_posts []=	$json_post;
    }
    return $matching_posts;
}

function blankSearchAll($home_url){
    global $wpdb;
    
    $all_posts = "SELECT ID, post_title, post_name
                    FROM $wpdb->posts
                   WHERE post_status= 'publish'
                ORDER BY ID DESC";
    $posts_and_tags =matchingPosts($all_posts, $home_url, 'postUrl', NO_LIMIT_POSTS);
    return $posts_and_tags;
}

function normalSearch($home_url, $search_for){
    global $wpdb;

    $title_search = "SELECT ID, post_title, post_name
				       FROM $wpdb->posts
                      WHERE post_status= 'publish'
                        AND post_title like '%$search_for%'
                   ORDER BY ID DESC";
    $matching_posts = matchingPosts($title_search, $home_url, 'postUrl', LIMIT_POSTS);

    $tag_search = "SELECT ID, post_title, post_name
                     FROM $wpdb->posts
                LEFT JOIN $wpdb->term_relationships
                       ON ($wpdb->posts.ID = $wpdb->term_relationships.object_id)
                LEFT JOIN $wpdb->term_taxonomy
                       ON $wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id
                    WHERE $wpdb->posts.post_status= 'publish'
                      AND $wpdb->posts.post_title NOT LIKE '%$search_for%'
                      AND $wpdb->term_taxonomy.term_id IN (SELECT term_id 
                                                             FROM $wpdb->terms 
                                                            WHERE name like '%$search_for%')
                 ORDER BY ID DESC";
    $matching_tags = matchingPosts($tag_search, $home_url, 'tagUrl', LIMIT_TAGS);
    $posts_and_tags = array_merge($matching_posts, $matching_tags);
    return $posts_and_tags;
}

function filterSearch($search_text){
    $non_valid_chars = "/[^" . VALID_CHARACTERS. "]/";
    $search_for = preg_replace($non_valid_chars, '', $search_text);
    return $search_for;
}




$search_for =filterSearch( @$_GET['search_text'] );
$home_url = home_url('/');

if ($search_text ===''){
    $posts_and_tags =blankSearchAll($home_url);
}else if (strlen($search_for)<AT_LEAST_CHARACTERS){
    $posts_and_tags =blankSearchAll($home_url);
} else {
    $posts_and_tags =normalSearch($home_url, $search_for);
}
$post_strings = implode(',', $posts_and_tags);
$json_output = postsToJson($post_strings);
echo $json_output;
?>
