<?php

/*
    Plugin Name: pi-timer
    # Plugin URI: https://github.com/p-i-/timer
    Description: My timer plugin
    Version: 1.0
    Author: Pi
 */

function pi_log( $it )
{
    echo '<script>console.log("PHP log: ' . $it . '")</script>';
}

class TimerPlugin
{
    public function __construct() 
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts_action'));

        add_shortcode('pi-timer'       , array($this, 'shortcode_timer'));
        add_shortcode('pi-timer-small' , array($this, 'shortcode_timer_small'));
        add_shortcode('ut-offer'       , array($this, 'shortcode_ut_offer'));
        add_shortcode('ut-flip'        , array($this, 'shortcode_ut_flip'));
    }

    function enqueue_scripts_action()
    {
        wp_enqueue_style('pi-timer',
                plugins_url('/css/pi-timer.css', __FILE__)); // path is relative to this file location

        // General plugin scripts
        wp_enqueue_script(
          'pi-timer',
          plugins_url('/js/pi-timer.js', __FILE__),
          array('jquery'),
          '', // script version, defaults to WP version
          false // false puts it in footer
          );
    }

    function shortcode_timer($atts) {
         ob_start();
        ?>
        <span class='urgency-timer ut-large'>
            <span class='ut-numbers ut-hh'>03</span>  <span class=ut-letters>h</span>
            <span class='ut-numbers ut-mm'>02</span>  <span class=ut-letters>m</span>
            <span class='ut-numbers ut-ss'>01</span>  <span class=ut-letters>s</span>
        </span>
        <?php
        return ob_get_clean();
    }

    function shortcode_timer_small($atts) {
        ob_start();
        ?>
        <span class='urgency-timer ut-small'>
            <span class=ut-hh>03</span>  <span class=ut-letters>:</span>
            <span class=ut-mm>02</span>  <span class=ut-letters>:</span>
            <span class=ut-ss>01</span>
        </span>
        <?php
        return ob_get_clean();
    }

    // $atts is e.g. `from='$99' to='$1'`
    // Display correct item depending on timer visible-status 
    function shortcode_ut_offer($atts) {
        $fullprice = $atts['from'];
        $discount = $atts['to'];

        $image_url = plugin_dir_url(__FILE__).'img/red-strike.png';

        ob_start();
        // If timer is visible, 'ut-priceslash-parent' and 'ut-reduced-price' are hidden
        //     else, 'ut-no-discount' is visible.
        ?>
        <span class='ut-no-discount'><?php echo $fullprice;?></span>
        <span class='ut-priceslash-parent'>
            <span class='ut-priceslash-text'><?php echo $fullprice;?></span>
            <img class='ut-priceslash-strike' src='<?php echo $image_url;?>' />
        </span>

        <span class='ut-reduced-price'>
            <b><?php echo $discount;?></b>
        </span>
        <?php
        return ob_get_clean();
    }

    function shortcode_ut_flip($atts) {
    //     $text_hidden = $atts['hidden'];
    //     $text_visible = $atts['visible'];

    //     ob_start();
    //     ? >
    //     <script>
    //         window.addEventListener('DOMContentLoaded', () => {
    //             window.piTimer.registerOnUpdateHook( is_vis => {
    //                 document.write( "x" );
    //             } );
    //         }
    //     </script>
    //     <? php
    //     return ob_get_clean();
    }
}

/* $wpPlugin = */ new TimerPlugin();
