// jQuery(document).ready(
//     function ($) {

debugMode = true;

class PiTimer
{
    constructor()
    {
        this.onUpdateEvent = null;

        this.deadline = localStorage.getItem('deadline');
        if( this.deadline === null || debugMode ) {
            let h=0, m=0, s = 10;
            let ms = 1000 * (s + 60 * (m + 60*h) );
            
            this.deadline = new Date( this.now_ms() + ms );

            localStorage.setItem('deadline', this.deadline);
        }

        this.showTimer = this.ms_until(this.deadline) > 0;

        this.timer = setInterval( this.tick.bind(this), 1000 );
        this.tick();
    }

    now_ms() {
        return +new Date();
    }

    ms_until(date)
    {
        return Date.parse(date) - this.now_ms();
    }

    split_ms(ms)
    {
        const seconds = Math.floor( ms / 1000                  ) % 60;
        const minutes = Math.floor( ms / (1000 * 60)           ) % 60;
        const hours   = Math.floor( ms / (1000 * 60 * 60)      ) % 24;
        const days    = Math.floor( ms / (1000 * 60 * 60 * 24) );

        return {
            'ms': ms,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    tick()
    {
        const ms = this.ms_until(this.deadline); // this.getTimeRemaining();

        const _showTimer = (ms > 0);

        if( _showTimer != this.showTimer ) {
            this.showTimer = _showTimer;
            if( this.onUpdateEvent !== null )
                this.onUpdateEvent(this.showTimer);
        }    

        if( this.showTimer ) {
            const dhms = this.split_ms( ms );

            for ( let e of [...document.querySelectorAll('.urgency-timer')] ) {
                //daysSpan.innerHTML    =        t.days;
                e.querySelector('.ut-h').innerHTML = ('0' + dhms.hours  ).slice(-2);
                e.querySelector('.ut-m').innerHTML = ('0' + dhms.minutes).slice(-2);
                e.querySelector('.ut-s').innerHTML = ('0' + dhms.seconds).slice(-2);
            }

            /* 
            //daysSpan.innerHTML    =        t.days;
            this.hoursSpan.innerHTML   = ('0' + dhms.hours  ).slice(-2);
            this.minutesSpan.innerHTML = ('0' + dhms.minutes).slice(-2);
            this.secondsSpan.innerHTML = ('0' + dhms.seconds).slice(-2);
            */
        }
        else
            clearInterval( this.tick );
        
        /* Alt:
            for ( let elem of [...document.querySelectorAll('.clockdiv')] )
                elem.hidden = true
        */
        if( this.showTimer )
            jQuery('.urgency-timer').show();
        else
            jQuery('.urgency-timer').hide();

        /*
        Works:
            let widget = document.getElementById("clockdiv");
            widget.style.display = this.showTimer ? 'inline' : 'none';

        Fails:
            let widget = $('clockdiv');
            widget.css( 'display', this.showTimer ? 'inline' : 'none' );
        
        Alts:
            document.getElementById("clockdiv");
            jQuery("#clockdiv")[0];
        */
    }

    onUpdate(f)
    {
        this.onUpdateEvent = f;
        f(this.showTimer);
    }
}

window.piTimer = new PiTimer();

// }); // jquery




// if( timer_showTimer() ) 
// {
//     let text = timer_showTimer() ? "Start Training for $1" : "Start Training";
//
//     jQuery(".cta-bronze a .elementor-button-text").html( text );
//   
//     jQuery(".cta-bronze a").attr( 'href', 'http://foo.com' );
//
// }
