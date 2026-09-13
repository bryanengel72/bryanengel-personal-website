document.documentElement.classList.add('js');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}},{threshold:.08});items.forEach(el=>observer.observe(el))}else{items.forEach(el=>el.classList.add('visible'))}
const layers=[...document.querySelectorAll('[data-parallax]')];let ticking=false;
function move(){if(!reduce.matches){layers.forEach(el=>{const bounds=el.parentElement.getBoundingClientRect();if(bounds.bottom>0&&bounds.top<innerHeight){el.style.transform=`translate3d(0,${-bounds.top*Number(el.dataset.parallax)}px,0)`}})}else layers.forEach(el=>el.style.transform='none');ticking=false}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(move)}},{passive:true});reduce.addEventListener('change',move);move();document.getElementById('year').textContent=new Date().getFullYear();
// Sticky header: pins after leaving the hero, reveals on scroll up, hides on scroll down
const header=document.querySelector('header');let lastY=scrollY;let pinned=false;
function headerState(){const y=scrollY;if(y<=12){header.classList.remove('pinned','show','animate');pinned=false}else if(y>140){if(!pinned){header.classList.add('pinned');header.classList.remove('show');void header.offsetHeight;header.classList.add('animate');pinned=true}if(y<lastY-2)header.classList.add('show');else if(y>lastY+2)header.classList.remove('show')}lastY=y}
addEventListener('scroll',headerState,{passive:true});headerState();
// Count-up stats
const counters=document.querySelectorAll('[data-count]');
if(counters.length&&'IntersectionObserver' in window&&!reduce.matches){const co=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;co.unobserve(e.target);const el=e.target,end=Number(el.dataset.count),suffix=el.dataset.suffix||'',t0=performance.now(),dur=1400;const tick=now=>{const p=Math.min(1,(now-t0)/dur),v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=v+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}},{threshold:.6});counters.forEach(el=>co.observe(el))}
