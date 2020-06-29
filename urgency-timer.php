<?php

/*
    Plugin Name: urgency-timer
    # Plugin URI: https://github.com/p-i-/WPUrgencyTimer
    Description: Urgency Countdown Timer
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

        add_shortcode('ut-timer'       , array($this, 'shortcode_ut_timer'));
        add_shortcode('ut-offer'       , array($this, 'shortcode_ut_offer')); // price slash
        add_shortcode('ut-url-flip'    , array($this, 'shortcode_ut_url_flip'));

        // not used
        add_shortcode('ut-timer-small' , array($this, 'shortcode_ut_timer_small'));
        add_shortcode('ut-button'      , array($this, 'shortcode_ut_button'));
    }

    function enqueue_scripts_action()
    {
        wp_enqueue_style('font-orbitron', 'https://fonts.googleapis.com/css2?family=Orbitron&display=swap' );

        // path is relative to this file location        
        wp_enqueue_style('urgency-timer', plugins_url('/css/urgency-timer.css', __FILE__) );

        wp_enqueue_script( 'urgency-timer', plugins_url('/js/urgency-timer.js', __FILE__) );
    }

    function shortcode_ut_timer($atts) {
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

    function shortcode_ut_timer_small($atts) {
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

    // Usage:
    //   [ut-button TextNormal normal.com TextOffer offer.com]
    function shortcode_ut_button($atts) {
        ob_start();
        ?>
        <script>
        {
            let parentNode = document.currentScript.parentNode;

            /* This JS is executed before DOMContentLoaded event fires,
               which will (see c'tor of timer) call update() which 
               fires all registerOnUpdateHook listeners.

               So YES we DO create the hook before the update event fires.
               So the button DOES get updated upon page-load.
             */

            window.urgencyTimer.registerOnUpdateHook( is_vis => {
                // std                                // offer
                let txtA = "<?php echo $atts[0];?>";  let txtB = "<?php echo $atts[2];?>";
                let urlA = "<?php echo $atts[1];?>";  let urlB = "<?php echo $atts[3];?>";

                let txt = is_vis ? txtB : txtA;
                let url = is_vis ? urlB : urlA;

                parentNode.closest( 'span' ).textContent = txt;
                parentNode.closest( 'a' ).href = url;
            });
        }
        </script>
        <?php
        return ob_get_clean();
    }

    function shortcode_ut_url_flip($atts) {
        ob_start();
        ?>
        <script>
        {
            let parentNode = document.currentScript.parentNode;

            /* This JS is executed before DOMContentLoaded event fires,
               which will (see c'tor of timer) call update() which 
               fires all registerOnUpdateHook listeners.

               So YES we DO create the hook before the update event fires.
               So the button DOES get updated upon page-load.
             */

            window.urgencyTimer.registerOnUpdateHook( is_vis => {
                let offer = "<?php echo $atts['offer']; ?>";
                let normal = "<?php echo $atts['normal']; ?>";

                let url = is_vis ? offer : normal;

                parentNode.closest( 'a' ).href = url;
            });
        }
        </script>
        <?php
        return ob_get_clean();
    }
}

/* $wpPlugin = */ new TimerPlugin();
