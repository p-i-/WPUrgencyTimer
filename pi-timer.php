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

        add_shortcode('pi-timer'      , array($this, 'timer_action'      )); // [pi-timer]       invokes this
        add_shortcode('pi-timer-small', array($this, 'timer_small_action')); // [pi-timer-small] invokes this

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
        $content = <<<EOS
<span class='urgency-timer ut-large'>
  <span class='ut-numbers ut-hh'>03</span>  <span class=ut-letters>h</span>
  <span class='ut-numbers ut-mm'>02</span>  <span class=ut-letters>m</span>
  <span class='ut-numbers ut-ss'>01</span>  <span class=ut-letters>s</span>
</span>
EOS;
        return $content;
    }





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
