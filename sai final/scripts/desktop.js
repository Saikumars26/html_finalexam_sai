
(function(){
  function toast(msg){
    let t = document.querySelector('.toast');
    if(!t){ t = document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(()=>{ t.classList.add('show'); });
    setTimeout(()=> t.classList.remove('show'), 2500);
  }

  function busy(btn, doneMsg){
    btn.setAttribute('aria-busy','true');
    const s = document.createElement('span'); s.className='spinner'; btn.appendChild(s);
    setTimeout(()=>{
      btn.removeAttribute('aria-busy'); s.remove();
      toast(doneMsg);
    }, 900);
  }

  const visit = document.querySelector('.visit-btn');
  if(visit){
    visit.addEventListener('click', ()=> busy(visit, 'Opening staff page (demo)…'));
  }
  const mapBtn = document.querySelector('.contact .btn');
  if(mapBtn){
    mapBtn.addEventListener('click', ()=> busy(mapBtn, 'Directions loaded (demo).'));
  }
})();
