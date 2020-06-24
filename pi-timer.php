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
        // pi_log('Test of pi_log' );

        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts_action'));

        add_shortcode('pi-timer'      , array($this, 'timer_action'));
        add_shortcode('pi-timer-small', array($this, 'timer_small_action'));

        add_shortcode('ut-offer'      , array($this, 'ut_offer_action'));

        //add_shortcode('pi-create-url', array($this, 'create_url_action')); // [timer] invokes this
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


    function timer_action($atts) {
        // $content = <<<EOS
         ob_start();
?>
        <span class='urgency-timer ut-large'>
          <span class='ut-numbers ut-hh'>03</span>  <span class=ut-letters>h</span>
          <span class='ut-numbers ut-mm'>02</span>  <span class=ut-letters>m</span>
          <span class='ut-numbers ut-ss'>01</span>  <span class=ut-letters>s</span>
        </span>

<?php
        return ob_get_clean();
        // EOS;
        // return $content;
    }


    // $atts is e.g. `from='$99' to='$1'`
    // Display correct item depending on timer visible-status 
    function ut_offer_action($atts) {
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

<span class='ut-reduced-price'><b>
        <?php echo $discount;?>
</b>
</span>
        <?php
        return ob_get_clean();
    }

//         echo "<span class='ut-from'>$from</span>";
//         echo "<span class='ut-price-strike'>$from</span>";
//         echo "<span class='ut-to'>$to</span>";

//         $content = <<<EOS
//             <span>
//             <script>
//                 window.addEventListener('DOMContentLoaded', () => {
//                     // add on-change handler
//                     window.piTimer.registerOnUpdateHook(
//                         (timerVisible) => {
//
//                         }
//                     );
//                 }
//             </script>
//             EOS;
//     }


    function timer_small_action($atts) {
        $content = <<<EOS
        <span class='urgency-timer ut-small'>
          <span class='ut-numbers ut-hh'>03</span>  <span class=ut-letters>:</span>
          <span class='ut-numbers ut-mm'>02</span>  <span class=ut-letters>:</span>
          <span class='ut-numbers ut-ss'>01</span>
        </span>
        EOS;
        return $content;
    }

//     function create_url_action($atts) {
//         $content = <<<EOS
// <a href='#' class='my_href'>my-link-text</a>
// EOS;
//         return $content;
//     }

}
/* $wpPlugin = */ new TimerPlugin();

// <div class=clockdiv>
//   <span class=number hours>  </span><span class=smalltext>h</span>
//   <span class=number minutes></span><span class=smalltext>m</span>
//   <span class=number seconds></span><span class=smalltext>s</span>
// </div>
