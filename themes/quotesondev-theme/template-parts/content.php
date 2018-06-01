<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

$source = get_post_meta( get_the_ID(), '_qod_quote_source', true );

$source_url = get_post_meta( get_the_ID(), '_qod_quote_source_url', true);

/*
echo esc_html ( $source );
echo esc_html( $source_url );
*/


?>


<div class="container">
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
		<div class="entry-content">
			<?php the_excerpt(); ?>
		</div><!-- .entry-content -->

		
		<div class="entry-meta">
			
			<h2 class="entry-title"> &mdash;<?php  echo the_title(); ?></h2>

			<?php if( $source && $source_url ) : ?>
				<span class="source">, <a href="<?php echo $source_url; ?> "><?php echo $source; ?></a></span>
			<?php elseif ( $source ) : ?>
				<span class="source">, <?php echo $source; ?></span>
			<?php else : ?>
				<span></span>
			<?php endif; ?>
			
			

		</div>	<!-- entry-meta -->


	</article><!-- #post-## -->

	<!-- Button to show another quote -->
	<?php if ( is_home() || is_single() ) : ?>
		<button type="button" id="new-quote-button">Show Me Another!</button>
	<?php endif; ?>

</div><!--container-->
