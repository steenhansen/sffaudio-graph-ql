<?php

get_header();
$graph_ql_html = include 'callGraphQlSearch.php';

?>

<div id="content">

	<div id="contentleft">
	
	  <?php echo $graph_ql_html; ?>
	
	</div>
		
	<?php include(TEMPLATEPATH."/l_sidebar.php");?>
	
	<?php include(TEMPLATEPATH."/r_sidebar.php");?>

</div>

<!-- The main column ends  -->

<?php get_footer(); ?>