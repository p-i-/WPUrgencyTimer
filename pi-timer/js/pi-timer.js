jQuery(document).ready(
    function ($) {

class PiTimer
{
    constructor()
    {
        this.is_vis = false;

        this.tickfuncs = []

        this.clock = document.getElementById('clockdiv');

        // this.daysSpan = clock.querySelector('.days'),
        this.hoursSpan   = this.clock.querySelector('.hours');
        this.minutesSpan = this.clock.querySelector('.minutes');
        this.secondsSpan = this.clock.querySelector('.seconds');

        this.timer = null;

        this.deadline = localStorage.getItem('deadline');
        if( this.deadline === null ) {
            let h=7, m=0, s = 0;
            let ms = 1000 * (s + 60 * (m + 60*h) );
            
            this.deadline = new Date( Date.parse(new Date()) + ms );

            localStorage.setItem('deadline', this.deadline);
        }

        this.timer = setInterval(this.tick.bind(this), 1000);
        this.tick();
    }

    getTimeRemaining()
    {
        var t = Date.parse(this.deadline) - Date.parse(new Date());
        var seconds = Math.floor( t / 1000                  );
        var minutes = Math.floor( t / (1000 * 60)           );
        var hours   = Math.floor( t / (1000 * 60 * 60)      );
        var days    = Math.floor( t / (1000 * 60 * 60 * 24) );
        return {
            'total': t,
            'days': days,
            'hours': hours % 24,
            'minutes': minutes % 60,
            'seconds': seconds % 60
        };
    }

    tick()
    {
        let t = this.getTimeRemaining();

        this.is_vis = t.total > 0;
        if (this.is_vis) {
            //daysSpan.innerHTML    =        t.days;
            this.hoursSpan.innerHTML   = ('0' + t.hours  ).slice(-2);
            this.minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            this.secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        }
        else
            clearInterval(this.tick);

        // let widget = document.getElementById("clockdiv"); // alt. can use: jQuery("#clockdiv")[0];
        // widget.style.display = this.is_vis ? "block" : "none";

        let widget = $('clockdiv'); //document.getElementById("clockdiv"); // alt. can use: jQuery("#clockdiv")[0];
        ////widget.css( 'display', this.is_vis ? 'block' : 'none' );

        for (const f of this.tickfuncs)
            f(this.is_vis);
    }

    addTickFunc(f) {
        this.tickfuncs.push(f);
    }
}

window.piTimer = new PiTimer();

}); // jquery


// if( timer_is_vis() ) 
// {
//     let text = timer_is_vis() ? "Start Training for $1" : "Start Training";
//
//     jQuery(".cta-bronze a .elementor-button-text").html( text );
//   
//     jQuery(".cta-bronze a").attr( 'href', 'http://foo.com' );
//
// }

