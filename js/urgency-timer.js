let debugMode = true;

var timout_hms = debugMode ? [0,0,10] : [7,0,0];


function operateOnMatchingElements(match, f) 
{ 
    for ( let el of [...document.querySelectorAll(match)] )
        f( el );
}

class UrgencyTimer
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
            // As we do the first tick, we start/sync all pulsing animations by adding ut-sync class
            operateOnMatchingElements( '.ut-ss, .ut-reduced-price', el => el.classList.add("ut-sync") );
            
            this.tick();
            this.timer = setInterval( this.tick.bind(this), 1000 );

            this.update();
        });
    }

    now_ms() {
        return +new Date();  // coerce to float
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

    update()
    {
        for( let hook of this.onUpdateHooks )
            hook( this.showTimer );
    }

    tick()
    {
        const ms = this.ms_until(this.deadline); // this.getTimeRemaining();

        const _showTimer = (ms > 0);

        if( _showTimer != this.showTimer ) {
            this.showTimer = _showTimer;            
            this.update();
        }    

        if( this.showTimer ) {
            const dhms = this.split_ms( ms );

            operateOnMatchingElements( '.urgency-timer', el => {
                el.querySelector('.ut-hh').innerHTML = dhms.hh;
                el.querySelector('.ut-mm').innerHTML = dhms.mm;
                el.querySelector('.ut-ss').innerHTML = dhms.ss;
            });
        }
        else
            clearInterval( this.tick );
        
        operateOnMatchingElements( '.urgency-timer, .ut-priceslash-parent, .ut-reduced-price',
            el => el.hidden = ! this.showTimer );

        operateOnMatchingElements( '.ut-no-discount',
            el => el.hidden = this.showTimer );
    }

    registerOnUpdateHook(f)
    {
        this.onUpdateHooks.push(f);
    }
}

window.urgencyTimer = new UrgencyTimer();
