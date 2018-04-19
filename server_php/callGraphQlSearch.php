<?php


//const GRAPH_URL = "http://localhost:3000/graphql";
const GRAPH_URL = "https://sffaudio-graphql.herokuapp.com/graphql";


/*
  http://www.sffaudio.com/wp-content/themes/revolution-code-blue2/callGraphQlSearch.php
  is called by WordPress search in
  http://www.sffaudio.com/wp-content/themes/revolution-code-blue2/search.php

  This file calls https://sffaudio-graphql.herokuapp.com/
  to get all matching graphQl data

*/


//ini_set('display_errors',1);
//ini_set('display_startup_errors',1);
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

const GRAPH_I_QL ='
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

const ENCODE_TO_URL = ["\r\n"=>'%0A', " " => "%20", "$" => "%24", ":" => "%3A", "{"=>'%7B',
                       "}"=> '%7D', ","=>'%2C', "+"=> "%20", "\n"=>'%0A' ];   // leave )".( alone

function graphQlUrl($graph_url, $graph_i_ql, $search_str){
    $raw_query = $graph_i_ql . '&variables={ "search_parameter": "' . $search_str . '"}';
    $raw_condensed = preg_replace('/ +/', ' ',$raw_query);
    $encoded_query= strtr($raw_condensed, ENCODE_TO_URL);
    $graph_ql_url = $graph_url . "?operationName=serch_ql&query=" . $encoded_query;
    return $graph_ql_url;
}


function sanitize_search($search_for){
    $search_for = preg_replace("/[^A-Za-z0-9 .]/", '', $search_for);
    $search_for = trim($search_for);
    return $search_for;
}

function buildSff($an_sff, $search_regex, $search_replace){
    $sff_author = $an_sff->possiblebook->author;
    $sff_title = $an_sff->possiblebook->title;
    if ($sff_author=='' && $sff_title==''){
        $sff_author_title =  $an_sff->about;
    }else{
        if (isset($an_sff->narrator)){
            $narrator = preg_replace($search_regex, $search_replace, $an_sff->narrator);
            $sff_narrator_by = " narrated by $narrator";
        }else{
            $sff_narrator_by = '';
        }
        $sff_author_title = preg_replace($search_regex, $search_replace, "$sff_title by $sff_author");
    }
    $sff_description = preg_replace($search_regex, $search_replace, $an_sff->podcast->description);
    $sff_mp3 = $an_sff->podcast->mp3;
    $sff_episode = $an_sff->podcast->episode;
    $sff_post =  $an_sff->sffaudio_post;
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

function buildRsd($an_rsd, $search_regex, $search_replace){
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

function checkTwitter($post_link){
    preg_match('/\d{18}$/', $post_link, $matches);
    if ($matches){
        $page_post = "https://twitter.com/SFFAudio/status/" . $matches[0];   // for 2 months in 2012
    }else{
        $page_post = $post_link;
    }
    return $page_post;
}

function buildPost($a_post, $search_regex, $search_replace){
    $page_headline = preg_replace($search_regex, $search_replace, $a_post->headline);
    if (isset($a_post->article_post)){
        $page_post = checkTwitter($a_post->article_post);
    }else{
        $page_post = checkTwitter($a_post->mention_post);
    }
    $rsd_html = "<li><a href='$page_post'>$page_headline</a></li>";
    return $rsd_html;
}

function buildIssues($issues){
    $issues_html='';
    $WORD_SPACER = WORD_SPACER;
    foreach($issues as $an_issue){
        $url = $an_issue->url;
        $publisher = trim($an_issue->publisher);
        $pages = $an_issue->pages;
        if ($pages ===1){
            $number_pages ='1 page';
        }else{
            $number_pages = "$pages pages";
        }
        $html_issue = "<li><a href='$url'>$publisher $WORD_SPACER $number_pages</a></li>";
        $issues_html .= $html_issue;
    }
    return $issues_html;
}

function buildPdf($a_pdf, $search_regex, $search_replace){
    $book_author = $a_pdf->book->author;
    $book_title = $a_pdf->book->title;
    $title_by_author = preg_replace($search_regex, $search_replace, "$book_title by $book_author");
    $issues = $a_pdf->issues;
    $issues_html = "<ol class='pdf-ol'>" . buildIssues($issues). '</ol>';
    $pdf_html = <<<EOT
        <li>
            $title_by_author  <br>
            $issues_html
        </li>
EOT;
    return $pdf_html;
}

function makeRsds($rsd_list){
    if ($rsd_list==''){
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

function makePdfs($pdf_list){
    if ($pdf_list==''){
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

function makeSffs($sff_list){
    if ($sff_list==''){
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

function makePages($post_list){
    if ($post_list==''){
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

function buildMatches($matches_list, $search_regex, $search_replace){
    $rsd_matches = '';
    $pdf_matches = '';
    $sff_matches = '';
    $page_matches='';
    foreach( $matches_list as $a_match){
        $match_id = $a_match->ID;
        if (preg_match(RSD_MEDIA_MATCH, $match_id)){
            $rsd_matches .= buildRsd($a_match, $search_regex, $search_replace);
        } else if (preg_match(PDF_MEDIA_MATCH, $match_id)){
            $pdf_matches .= buildPdf($a_match, $search_regex, $search_replace);
        } else if (preg_match(SFF_MEDIA_MATCH, $match_id)){
            $sff_matches .= buildSff($a_match, $search_regex, $search_replace);
        } else if (preg_match(POST_MEDIA_MATCH, $match_id)){
            $page_matches .= buildPost($a_match, $search_regex, $search_replace);
        }
    }
    return [$rsd_matches, $pdf_matches, $sff_matches, $page_matches];
}

function buildHtml($my_matches){
    $rsd_html = makeRsds($my_matches[0]);
    $pdf_html = makePdfs($my_matches[1]);
    $sff_html = makeSffs($my_matches[2]);
    $page_html = makePages($my_matches[3]);
    $all_html = <<<EOT
		<div class=''>
			$rsd_html
			<hr>
			$pdf_html
			<hr>
			$sff_html
			<hr>
			$page_html
		</div>
EOT;
    return $all_html;
}

function jsonGraphQl($graph_ql_url){
    $curl_handle = curl_init($graph_ql_url);
    curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl_handle, CURLOPT_HTTPHEADER, array('Accept: application/json'));
    $graphql_str = curl_exec($curl_handle);
    $graphql_json = json_decode($graphql_str);
    $matches_list = $graphql_json->data->search_site_content;
    return $matches_list;
}

$search_for = sanitize_search($_GET['s']);
if (strlen($search_for)>2){
    $graph_ql_url = graphQlUrl(GRAPH_URL, GRAPH_I_QL, $search_for);
    $matches_list= jsonGraphQl($graph_ql_url);
    $search_regex = "/($search_for)/i";
    $search_replace = '<span class="search-match">$1</span>';
    $my_matches = buildMatches($matches_list, $search_regex, $search_replace);
    $matching_html = buildHtml($my_matches);
    return  SEARCH_STYLES . $matching_html;
}else{
    return "<br>Type at least 3 characters for search to work.";
}

?>