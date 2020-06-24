// jQuery(document).ready(
//     function ($) {

debugMode = true;

var timout_hms = debugMode ? [0,0,10] : [7,0,0];

class PiTimer
{
    constructor()
    {
        this.onUpdateHooks = [];

        this.deadline = localStorage.getItem('deadline');
        if( this.deadline === null || debugMode ) {
            let [h,m,s] = timout_hms;
            let ms = 1000 * (s + 60 * (m + 60*h) );
            
            this.deadline = new Date( this.now_ms() + ms );

            localStorage.setItem('deadline', this.deadline);
        }

        this.showTimer = this.ms_until(this.deadline) > 0;

        window.addEventListener('DOMContentLoaded', () => {
            for ( let e of [...document.querySelectorAll('.ut-ss, .ut-reduced-price')] )
                e.classList.add("ut-sync");
            this.tick();
            this.timer = setInterval( this.tick.bind(this), 1000 );
        });
    }

    now_ms() {
        return +new Date(); // coerce to float
    }

    ms_until(date)
    {
        return Date.parse(date) - this.now_ms();
    }

    split_ms(ms)
    {
        const s = Math.floor( ms / 1000                  ) % 60;
        const m = Math.floor( ms / (1000 * 60)           ) % 60;
        const h = Math.floor( ms / (1000 * 60 * 60)      ) % 24;
        const d = Math.floor( ms / (1000 * 60 * 60 * 24) );

        let f = x => ('0' + x).slice(-2);  // format to len-2 string

        return {
            'ms': ms,
            'dd': f(d),
            'hh': f(h),
            'mm': f(m),
            'ss': f(s)
        };
    }                

    tick()
    {
        const ms = this.ms_until(this.deadline); // this.getTimeRemaining();

        const _showTimer = (ms > 0);

        if( _showTimer != this.showTimer ) {
            this.showTimer = _showTimer;
            // if( this.onUpdateEvent !== null )
            //     this.onUpdateEvent(this.showTimer);
            for( let hook of this.onUpdateHooks )
                hook( this.showTimer );
        }    

        if( this.showTimer ) {
            const dhms = this.split_ms( ms );

            for ( let e of [...document.querySelectorAll('.urgency-timer')] ) {
                e.querySelector('.ut-hh').innerHTML = dhms.hh;
                e.querySelector('.ut-mm').innerHTML = dhms.mm;
                e.querySelector('.ut-ss').innerHTML = dhms.ss;
            }
        }
        else
            clearInterval( this.tick );
        
        for ( let el of [...document.querySelectorAll('.urgency-timer')] )
            el.hidden = ! this.showTimer;

        
        for ( let el of [...document.querySelectorAll('.ut-no-discount')] )
            el.hidden = this.showTimer;

        for ( let el of [...document.querySelectorAll('.ut-priceslash-parent')] )
            el.hidden = ! this.showTimer;

        for ( let el of [...document.querySelectorAll('.ut-reduced-price')] )
            el.hidden = ! this.showTimer;
    }

    registerOnUpdateHook(f) {
        this.onUpdateHooks.push(f);
    }
}

window.piTimer = new PiTimer();

// if( timer_showTimer() ) 
// {
//     let text = timer_showTimer() ? "Start Training for $1" : "Start Training";
//
//     jQuery(".cta-bronze a .elementor-button-text").html( text );
//   
//     jQuery(".cta-bronze a").attr( 'href', 'http://foo.com' );
//
// }
