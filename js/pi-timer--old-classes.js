jQuery(document).ready(
    function ($) {

function PiTimer()
{
    let self = this;

    // getTimeRemaining() {
    this.getTimeRemaining = function() {

        var t = Date.parse(self.deadline) - Date.parse(new Date());
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

    this.tick = function() {
        let t = self.getTimeRemaining();

        self.is_vis = t.total > 0;
        if (self.is_vis) {
            //daysSpan.innerHTML    =        t.days;
            self.hoursSpan.innerHTML   = ('0' + t.hours  ).slice(-2);
            self.minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            self.secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        }
        else
            clearInterval(self.tick);

        // let widget = document.getElementById("clockdiv"); // alt. can use: jQuery("#clockdiv")[0];
        // widget.style.display = self.is_vis ? "block" : "none";

        let widget = $('clockdiv'); //document.getElementById("clockdiv"); // alt. can use: jQuery("#clockdiv")[0];
        widget.css( 'display', self.is_vis ? 'block' : 'none' );

        for (const f of self.tickfuncs)
            f(self.is_vis);

        $('.my_href').text( self.is_vis ? 'visible' : 'hidden' ); // by class
        //.attr( 'href', 'http://foo.com' );
    }

    this.addTickFunc = function(f) {
        self.tickfuncs.push(f);
    }

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

    this.timer = setInterval(this.tick, 1000);
    this.tick();
}

// console.log("A");
window.piTimer = new PiTimer();

// function tickFunc(is_vis) {
//     console.log(is_vis);
//     $("#foo-textbox").text("BAR");
// }

// window.piTimer.addTickFunc(tickFunc);

}); // jquery


// let timer_obj = {
//     getTimeRemaining : function (endtime)
//     {
//         var t = Date.parse(endtime) - Date.parse(new Date());
//         var seconds = Math.floor( t / 1000                  );
//         var minutes = Math.floor( t / (1000 * 60)           );
//         var hours   = Math.floor( t / (1000 * 60 * 60)      );
//         var days    = Math.floor( t / (1000 * 60 * 60 * 24) );
//         return {
//             'total': t,
//             'days': days,
//             'hours': hours % 24,
//             'minutes': minutes % 60,
//             'seconds': seconds % 60
//         };
//     }


// function initializeClock(id, endtime)
// {
//     let clock = document.getElementById(id);
//     let  //daysSpan    = clock.querySelector('.days'),
//          hoursSpan   = clock.querySelector('.hours'),
//          minutesSpan = clock.querySelector('.minutes'),
//          secondsSpan = clock.querySelector('.seconds');
    
//     let timer;
    
//     function tick() {
//         let t = getTimeRemaining(endtime);
        
//         if (t.total > 0) {
//             //daysSpan.innerHTML    =        t.days;
//             hoursSpan.innerHTML   = ('0' + t.hours  ).slice(-2);
//             minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//             secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            
            
//             hide = false;
//         }
//         else
//         {
//             clearInterval(tick);
//             hide = true;
//         }
        
//         let widget = document.getElementById("clockdiv"); // alt. can use: jQuery("#clockdiv")[0];
//         widget.style.display = hide ? "none" : "block";
//     }
    
//     timer = setInterval(tick, 1000);
//     tick();
// }



// let deadline = localStorage.getItem('deadline');
// if( deadline === null ) {
//     let h=7, m=0, s = 0;
//     let ms = 1000 * (s + 60 * (m + 60*h) );
    
//     deadline = new Date( Date.parse(new Date()) + ms );

//     localStorage.setItem('deadline', deadline);
// }

// // returns true or false
// // function timer_is_vis()
// // {
// //     let widget = document.getElementById("clockdiv"); // jQuery("#clockdiv");
// //     return widget.style.display == "block";
// // }


// // if( timer_is_vis() ) 
// // {
// //     let text = timer_is_vis() ? "Start Training for $1" : "Start Training";

// //     jQuery(".cta-bronze a .elementor-button-text").html( text );
    
// //     jQuery(".cta-bronze a").attr( 'href', 'http://foo.com' );

// // }

// //$( document ).ready(function() {

// // var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
//         //console.log( "ready!" );
//         initializeClock('clockdiv', deadline);
//     });
