document.documentElement.classList.add('js');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}},{threshold:.08});items.forEach(el=>observer.observe(el))}else{items.forEach(el=>el.classList.add('visible'))}
const layers=[...document.querySelectorAll('[data-parallax]')];let ticking=false;
function move(){if(!reduce.matches){layers.forEach(el=>{const bounds=el.parentElement.getBoundingClientRect();if(bounds.bottom>0&&bounds.top<innerHeight){el.style.transform=`translate3d(0,${-bounds.top*Number(el.dataset.parallax)}px,0)`}})}else layers.forEach(el=>el.style.transform='none');ticking=false}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(move)}},{passive:true});reduce.addEventListener('change',move);move();document.getElementById('year').textContent=new Date().getFullYear();
