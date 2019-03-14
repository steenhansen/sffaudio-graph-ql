<?php

// public_html/wp-content/themes/revolution-code-blue2/function-media_list.php



/*
 * public_html/wp-content/themes/revolution-code-blue2/functions.php
 *   include 'function-media_list.php';
 * 
 *  
 *  Modify WordPress Page - Search
 *    add [media_list_component] to the HTML
 *    and page attributes
 *          - NO PARENT
 *          - Default Template
 */

//const GRAPH_URL = "http://localhost:3000/graphql";
//const GRAPH_URL = "https://sffaudio-graphql.herokuapp.com/graphql";
//const GRAPH_URL = "https://graphql-search.herokuapp.com/graphql";
const GRAPH_URL = "https://sffaudio-graph-ql.herokuapp.com/graphql";


const GRAPH_I_QL = '
query serch_ql($search_parameter: String!) {
  search_site_content(search_text: $search_parameter) {
    ... on ArticlePage{ ID headline article_post },
    ... on MentionPage{ ID headline mention_post },
    ... on RsdMedia { ID rsd_post resource
                      book { author title }
                      podcast { description mp3 length episode } },
    ... on SffAudioMedia { ID sffaudio_post narrator about
                           possiblebook{  author title }
                           podcast { description mp3 length episode } },
    ... on PdfMedia { ID
                      book { author title }
                      issues { url publisher pages } }
  }
}       ';


const WORD_SPACER = ' &nbsp; &nbsp; ';

define("RSD_MEDIA_MATCH", "/RsdMedia_/");
define("PDF_MEDIA_MATCH", "/PdfMedia_/");
define("SFF_MEDIA_MATCH", "/SffAudioMedia_/");
define("POST_MEDIA_MATCH", "/POST_/");

const SEARCH_STYLES = <<<EOT
	<style>
		.pdf-ol{
			margin-top:2px;
		}
		.search-match{
    		color: #7DAE12;
		}
		.media-head{
			color: #2255AA;
			text-align: center;
			font-size:26.08pt;
		}
	</style>

EOT;

const ENCODE_TO_URL = ["\r\n" => '%0A', " " => "%20", "$" => "%24", ":" => "%3A", "{" => '%7B', "}" => '%7D', "," => '%2C', "+" => "%20", "\n" => '%0A'];   // leave )".( alone


if (!class_exists('SffGraphQuery')) {


    class SffGraphQuery
    {

        static function graphQlUrl($graph_url, $graph_i_ql, $search_str)
        {
            $raw_query = $graph_i_ql . '&variables={ "search_parameter": "' . $search_str . '"}';
            $raw_condensed = preg_replace('/ +/', ' ', $raw_query);
            $encoded_query = strtr($raw_condensed, ENCODE_TO_URL);
            $graph_ql_url = $graph_url . "?operationName=serch_ql&query=" . $encoded_query;
            return $graph_ql_url;
        }


        static function sanitizeSearch($search_for)
        {
            $search_for = preg_replace("/\\\'/", "'", $search_for);        //    replace \' with '
            $search_for = preg_replace("/[^A-Za-z0-9 .-\\\']/", '', $search_for);   //    \\\' matches one '
            $search_for = trim($search_for);
            return $search_for;
        }

        static function buildSff($an_sff, $search_regex, $search_replace)
        {
            $sff_narrator_by = '';
            $sff_author = $an_sff->possiblebook->author;
            $sff_title = $an_sff->possiblebook->title;
            if ($sff_author == '' && $sff_title == '') {
                $sff_author_title = $an_sff->about;
            } else {
                if (isset($an_sff->narrator)) {
                    $narrator = preg_replace($search_regex, $search_replace, $an_sff->narrator);
                    $sff_narrator_by = " narrated by $narrator";
                }
                $sff_author_title = preg_replace($search_regex, $search_replace, "$sff_title by $sff_author");
            }
            $sff_description = preg_replace($search_regex, $search_replace, $an_sff->podcast->description);
            $sff_mp3 = $an_sff->podcast->mp3;
            $sff_episode = $an_sff->podcast->episode;
            $sff_post = $an_sff->sffaudio_post;
            $WORD_SPACER = WORD_SPACER;
            $sff_html = <<<EOT
        <li>
            <a href="$sff_post">#$sff_episode $sff_description $sff_author_title</a>
            $WORD_SPACER <a href="$sff_mp3">Mp3</a>
			$WORD_SPACER $sff_narrator_by
        </li>
EOT;
            return $sff_html;
        }

        static function buildRsd($an_rsd, $search_regex, $search_replace)
        {
            $podcast_description = preg_replace($search_regex, $search_replace, $an_rsd->podcast->description);
            $podcast_mp3 = $an_rsd->podcast->mp3;
            $podcast_episode = $an_rsd->podcast->episode;
            $rsd_post = $an_rsd->rsd_post;
            $resource = $an_rsd->resource;
            $WORD_SPACER = WORD_SPACER;
            $rsd_html = <<<EOT
        <li>
             <a href='$rsd_post'>$podcast_description</a>
			 $WORD_SPACER #$podcast_episode 
			 $WORD_SPACER <a href='$podcast_mp3'>Mp3</a>
			 $WORD_SPACER <a href='$resource'>Pdf or video</a>
        </li>
EOT;
            return $rsd_html;
        }

        static function checkTwitter($post_link)
        {
            preg_match('/\d{18}$/', $post_link, $matches);
            if ($matches) {
                $page_post = "https://twitter.com/SFFAudio/status/" . $matches[0];   // for 2 months in 2012
            } else {
                $page_post = $post_link;
            }
            return $page_post;
        }

        static function buildPost($a_post, $search_regex, $search_replace)
        {
            $page_headline = preg_replace($search_regex, $search_replace, $a_post->headline);
            if (isset($a_post->article_post)) {
                $page_post = SffGraphQuery::checkTwitter($a_post->article_post);
            } else {
                $page_post = SffGraphQuery::checkTwitter($a_post->mention_post);
            }
            $rsd_html = "<li><a href='$page_post'>$page_headline</a></li>";
            return $rsd_html;
        }

        static function buildIssues($issues)
        {
            $issues_html = '';
            $WORD_SPACER = WORD_SPACER;
            foreach ($issues as $an_issue) {
                $url = $an_issue->url;
                $publisher = trim($an_issue->publisher);
                $pages = $an_issue->pages;
                if ($pages === 1) {
                    $number_pages = '1 page';
                } else {
                    $number_pages = "$pages pages";
                }
                $html_issue = "<li><a href='$url'>$publisher $WORD_SPACER $number_pages</a></li>";
                $issues_html .= $html_issue;
            }
            return $issues_html;
        }

        static function buildPdf($a_pdf, $search_regex, $search_replace)
        {
            $book_author = $a_pdf->book->author;
            $book_title = $a_pdf->book->title;
            $title_by_author = preg_replace($search_regex, $search_replace, "$book_title by $book_author");
            $issues = $a_pdf->issues;
            $issues_html = "<ol class='pdf-ol'>" . SffGraphQuery::buildIssues($issues) . '</ol>';
            $pdf_html = <<<EOT
        <li>
            $title_by_author  <br>
            $issues_html
        </li>
EOT;
            return $pdf_html;
        }

        static function makeRsds($rsd_list)
        {
            if ($rsd_list == '') {
                $rsd_list = 'no entries';
            }
            $rsd_html = <<<EOT
        <div class=''>
			<p class='media-head'>Reading Short & Deep</p><br>
            $rsd_list
           
        </div>
EOT;
            return $rsd_html;
        }

        static function makePdfs($pdf_list)
        {
            if ($pdf_list == '') {
                $pdf_list = 'no entries';
            }
            $pdf_html = <<<EOT
        <div class=''>
			<p class='media-head'>Public Domain PDFs</p><br>
            $pdf_list
           
        </div>
EOT;
            return $pdf_html;
        }

        static function makeSffs($sff_list)
        {
            if ($sff_list == '') {
                $sff_list = 'no entries';
            }
            $sff_html = <<<EOT
        <div class=''>
			<p class='media-head'>SFFaudio Podcasts</p><br>
            $sff_list
        </div>
EOT;
            return $sff_html;
        }

        static function makePages($post_list)
        {
            if ($post_list == '') {
                $post_list = 'no entries';
            }
            $post_html = <<<EOT
        <div class=''>
			<p class='media-head'>SFFaudio Posts</p><br>
            $post_list         
        </div>
EOT;
            return $post_html;
        }

        static function buildMatches($matches_list, $search_regex, $search_replace)
        {
            $rsd_matches = '';
            $pdf_matches = '';
            $sff_matches = '';
            $page_matches = '';
            foreach ($matches_list as $a_match) {
                $match_id = $a_match->ID;
                if (preg_match(RSD_MEDIA_MATCH, $match_id)) {
                    $rsd_matches .= SffGraphQuery::buildRsd($a_match, $search_regex, $search_replace);
                } else if (preg_match(PDF_MEDIA_MATCH, $match_id)) {
                    $pdf_matches .= SffGraphQuery::buildPdf($a_match, $search_regex, $search_replace);
                } else if (preg_match(SFF_MEDIA_MATCH, $match_id)) {
                    $sff_matches .= SffGraphQuery::buildSff($a_match, $search_regex, $search_replace);
                } else if (preg_match(POST_MEDIA_MATCH, $match_id)) {
                    $page_matches .= SffGraphQuery::buildPost($a_match, $search_regex, $search_replace);
                }
            }
            return [$rsd_matches, $pdf_matches, $sff_matches, $page_matches];
        }

        static function buildHtml($my_matches)
        {
            $rsd_html = SffGraphQuery::makeRsds($my_matches[0]);
            $pdf_html = SffGraphQuery::makePdfs($my_matches[1]);
            $sff_html = SffGraphQuery::makeSffs($my_matches[2]);
            $page_html = SffGraphQuery::makePages($my_matches[3]);
            $all_html = <<<EOT
      
		<div class=''>
			$page_html
			<hr>
			$rsd_html
			  <a name="start_graphql"></a>
			<hr>
			$pdf_html
			<hr>
			$sff_html
		</div>
EOT;
            return $all_html;
        }

        static function jsonGraphQl($graph_ql_url)
        {
            
       //     print "xxx<br>$graph_ql_url<br>yyy";
            
            $curl_handle = curl_init($graph_ql_url);
            curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array('Accept: application/json'));
            $graphql_str = curl_exec($curl_handle);
            $graphql_json = json_decode($graphql_str);
            switch (json_last_error()) {
                case JSON_ERROR_NONE:
                    $matches_list = $graphql_json->data->search_site_content;
                    break;
                default:
                    $matches_list = [];
                    break;
            }
            return $matches_list;
        }

        static function searchHtml($search_for){
            $graph_ql_url = SffGraphQuery::graphQlUrl(GRAPH_URL, GRAPH_I_QL, $search_for);
            $matches_list = SffGraphQuery::jsonGraphQl($graph_ql_url);
            $search_regex = "/($search_for)/i";
            $search_replace = '<span class="search-match">$1</span>';
            $my_matches = SffGraphQuery::buildMatches($matches_list, $search_regex, $search_replace);
            $matching_html = SffGraphQuery::buildHtml($my_matches);
            $query_answer = SEARCH_STYLES . $matching_html;
            return $query_answer;
        }

    }
}

// https://www.sffaudio.com/search/
if (!function_exists('media_list_component')) {
    function media_list_component()
    {  //  [media_list_component]

        error_reporting(E_ALL);
        ini_set('display_errors', 1);


             if (isset($_POST['search_term'])) {
            $search_term = $_POST['search_term'];
        } else if (isset($_GET['search_term'])) {
            $search_term = $_GET['search_term'];
        } else {
            $search_term = '';
        }
        
          
     $search_for = SffGraphQuery::sanitizeSearch($search_term);


        if (strlen($search_for) > 2) {
            $query_answer =SffGraphQuery::searchHtml($search_for);
        } else {
            $empty_html =  SffGraphQuery::buildHtml([ '','','','' ]);
            $query_answer =  SEARCH_STYLES . $empty_html;
          //  $query_answer = "<br>Type at least 3 characters for search to work.";
        }

        $query_html = "<div id='search_div' style='margin-top:16px; clear:both;'>$query_answer</div>";

        error_reporting(0);
        ini_set('display_errors', 0);

        return $query_html;
    }
}


if (!shortcode_exists('media_list_component')) {
        add_shortcode('media_list_component', media_list_component);
}

