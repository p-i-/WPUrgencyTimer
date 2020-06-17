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
        pi_log('Test of pi_log' );

        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts_action'));

        add_shortcode('pi-timer', array($this, 'timer_action')); // [timer] invokes this

        add_shortcode('pi-create-url', array($this, 'create_url_action')); // [timer] invokes this
    }

    function enqueue_scripts_action()
    {
        wp_enqueue_style('pi-timer',
                plugins_url('/css/pi-timer.css', __FILE__)); // path is relative to this file location

        // General plugin scripts
        wp_enqueue_script(
          'pi-timer',
          plugins_url('/js/pi-timer.js', __FILE__),
          array('jquery')
          );
    }

    function timer_action($atts) {
        $content = <<<EOS
<div id="clockdiv">
  <!--<span class="days"></span><span class="smalltext">d</span>-->
  <span class="hours"></span><span class="smalltext">h</span>
  <span class="minutes"></span><span class="smalltext">m</span>
  <span class="seconds"></span><span class="smalltext">s</span>
</div>
EOS;
        return $content;
    }

    function create_url_action($atts) {
        $content = <<<EOS
<a href='#' class='my_href'>my-link-text</a>
EOS;
        return $content;
    }
}
/* $wpPlugin = */ new TimerPlugin();

