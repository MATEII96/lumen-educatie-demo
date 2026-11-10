/* LUMEN · first-person WebGL escape rooms. Runs locally without external 3D libraries. */
(()=>{
  'use strict';

  const rooms={
    archive:{
      id:'archive',title:'Arhiva celor trei sigilii',subject:'ISTORIE · CAZ DE ARHIVĂ',tone:[.47,.34,.18],wall:[.19,.20,.21],floor:[.19,.17,.14],
      objective:'Cercetează arhiva, descifrează anul provinciei și deschide drumul spre următoarea cameră.',
      clues:[
        {id:'map',name:'Harta cetății',text:'Sarmizegetusa Regia a fost centrul politic și religios al Regatului Dac înainte de cucerirea romană.',at:[-1.8,2.05,-3.78],visual:'map'},
        {id:'tablet',name:'Tăblița cronicarului',text:'Împăratul roman Traian a condus războaiele împotriva lui Decebal.',at:[-2.25,1.05,-1.48],visual:'tablet'},
        {id:'coin',name:'Moneda imperială',text:'În anul 106 d.Hr., după războaiele lui Traian, Dacia a devenit provincie romană.',at:[1.05,1.05,-.15],visual:'coin'},
        {id:'column',name:'Relieful de pe Columnă',text:'Columna lui Traian prezintă episoade din campaniile daco-romane din anii 101–102 și 105–106.',at:[3.1,1.05,2.25],visual:'column',station:true}
      ],
      lock:{at:[.86,1.43,-5.78],kind:'code',title:'Încuietoarea dosarului',hint:'Folosește anul dezvăluit de indiciul de pe moneda imperială. Introdu anul fără „d.Hr.”.',answer:'106',inputLabel:'Anul provinciei',placeholder:'AN',error:'Recitește indiciul monedei și verifică anul.'},
      fact:'Dosarul s-a deschis: indiciile te-au condus la anul 106 d.Hr., asociat transformării Daciei în provincie romană.',
      decor:'archive'
    },
    cell:{
      id:'cell',title:'Laboratorul celulei',subject:'BIOLOGIE · LABORATOR DE MODELARE',tone:[.16,.52,.39],wall:[.12,.22,.21],floor:[.10,.17,.17],
      objective:'Recuperează indiciile din laborator și reconstruiește modelul celular pentru a reporni ieșirea.',
      clues:[
        {id:'scope',name:'Microscopul',text:'Nucleul conține material genetic și coordonează multe dintre activitățile celulei.',at:[-2.3,1.02,-.9],visual:'scope'},
        {id:'dish',name:'Cutia Petri',text:'Membrana celulară delimitează celula și reglează schimburile cu mediul.',at:[.2,1.02,-.55],visual:'dish'},
        {id:'model',name:'Modelul transparent',text:'Citoplasma este mediul intern în care se află structurile celulei.',at:[2.15,2.1,-3.78],visual:'cell'}
      ],
      lock:{at:[3.72,1.48,-2.05],kind:'assembly',title:'Reconstruiește modelul',hint:'Așază fiecare structură în locul potrivit pentru a completa modelul celular.'},
      fact:'Modelul celular a fost refăcut: membrana delimitează, citoplasma formează mediul intern, iar nucleul coordonează multe activități.',
      decor:'cell'
    },
    signal:{
      id:'signal',title:'Camera semnalului',subject:'FIZICĂ · LABORATOR DE CIRCUITE',tone:[.33,.43,.82],wall:[.13,.17,.25],floor:[.11,.14,.21],
      objective:'Caută componentele camerei și conectează circuitul astfel încât becul de ieșire să se aprindă.',
      clues:[
        {id:'battery',name:'Sursa de energie',text:'O baterie poate furniza energie electrică unui circuit.',at:[-2.45,.98,-.9],visual:'battery'},
        {id:'switch',name:'Întrerupătorul',text:'Întrerupătorul poate deschide sau închide circuitul.',at:[2.45,1.02,-.75],visual:'switch'},
        {id:'bulb',name:'Becul de semnal',text:'Becul luminează când face parte dintr-un circuit închis alimentat de o sursă.',at:[-2.1,2.15,-3.78],visual:'bulb'}
      ],
      lock:{at:[3.72,1.48,-2.05],kind:'circuit',title:'Refă circuitul de ieșire',hint:'Leagă traseul în ordinea în care energia pornește, este controlată și ajunge la consumator.'},
      fact:'Circuitul este închis: bateria furnizează energie, întrerupătorul controlează traseul, iar becul se aprinde.',
      decor:'signal'
    },
    math:{
      id:'math',title:'Codul secret al ecuațiilor',subject:'MATEMATICĂ · CAMERA NUMERELOR',tone:[.47,.37,.82],wall:[.18,.16,.27],floor:[.14,.13,.22],
      objective:'Cercetează tabla, balanța și jurnalul, apoi descifrează numărul care echilibrează ecuația.',
      clues:[
        {id:'board',name:'Tabla luminată',text:'Pe tablă este notată relația x + 7 = 12.',at:[-1.85,2.08,-3.78],visual:'board'},
        {id:'balance',name:'Balanța cu talere',text:'Păstrează egalitatea: scade aceeași cantitate din ambele părți pentru a izola necunoscuta.',at:[-2.35,1.05,-1.1],visual:'balance'},
        {id:'journal',name:'Jurnalul de calcul',text:'Operația inversă adunării este scăderea. Compară 12 cu 7 pentru a afla valoarea rămasă.',at:[1.05,1.05,-.15],visual:'journal'}
      ],
      lock:{at:[.86,1.43,-3.72],kind:'code',title:'Consola ecuației',hint:'Introdu valoarea necunoscutei care păstrează egalitatea x + 7 = 12.',answer:'5'},
      fact:'Ecuația este echilibrată: x = 5, deoarece 5 + 7 = 12.',
      decor:'math'
    }
  };

  rooms.archive.chapters=[
    {
      title:'Camera cronologiei',subject:'ISTORIE · CRONOLOGIA RĂZBOAIELOR DACO-ROMANE',tone:[.58,.39,.18],wall:[.23,.20,.17],floor:[.22,.17,.12],decor:'vault',
      objective:'Pune în ordine evenimentele și folosește datele pentru a deschide poarta arhivei.',
      clues:[
        {id:'war101',name:'Dosarul campaniei I',text:'Primul război daco-roman s-a desfășurat în anii 101–102 d.Hr.',at:[-4.25,1.05,-3.65],station:true},
        {id:'peace102',name:'Pacea din 102',text:'După prima campanie a urmat o perioadă de pace, înaintea unui nou conflict.',at:[4.05,1.05,-3.55],station:true},
        {id:'war105',name:'Dosarul campaniei II',text:'Al doilea război daco-roman a avut loc în anii 105–106 d.Hr.',at:[-4.25,1.05,2.6],station:true},
        {id:'province106',name:'Actul provinciei',text:'După războaie, o mare parte a fostului regat dac a devenit provincia romană Dacia.',at:[4.05,1.05,2.65],station:true}
      ],
      lock:{at:[0,1.42,-5.78],kind:'sequence',title:'Linia timpului',hint:'Așază cele patru evenimente în ordine. Cronologia te ajută să separi cele două campanii.',options:[{id:'war101',label:'Primul război · 101–102'},{id:'peace102',label:'Pacea · 102'},{id:'war105',label:'Al doilea război · 105–106'},{id:'province106',label:'Provincia Dacia'}],answer:['war101','peace102','war105','province106'],error:'Cronologia nu se leagă încă. Compară anii fiecărei campanii.'},
      fact:'Ai reconstruit succesiunea celor două războaie și ai observat cum anul 106 încheie al doilea conflict și marchează începutul provinciei romane Dacia.'
    },
    {
      title:'Sala mărturiilor',subject:'ISTORIE · SURSE ȘI PERSONAJE',tone:[.38,.31,.53],wall:[.17,.16,.24],floor:[.14,.13,.2],decor:'gallery',
      objective:'Leagă sursele și personajele istorice de rolul lor, apoi verifică dosarul final.',
      clues:[
        {id:'decebalSource',name:'Portretul lui Decebal',text:'Decebal a fost regele dac din timpul conflictelor cu împăratul Traian.',at:[-4.35,1.05,-3.65],station:true},
        {id:'traianSource',name:'Inscripția imperială',text:'Traian a fost împăratul roman care a condus campaniile împotriva dacilor.',at:[4.2,1.05,-3.55],station:true},
        {id:'regiaSource',name:'Planul Sarmizegetusei Regia',text:'Sarmizegetusa Regia a fost centrul politic și religios al regatului dac înainte de cucerirea romană.',at:[-4.35,1.05,2.6],station:true},
        {id:'columnSource',name:'Fragmentul de relief',text:'Columna lui Traian este un monument narativ cu scene din războaiele daco-romane.',at:[4.2,1.05,2.65],station:true}
      ],
      lock:{at:[0,1.42,-5.78],kind:'matching',title:'Masa curatorului',hint:'Asociază fiecare nume sau monument cu descrierea potrivită.',pairs:[{id:'decebal',left:'Decebal',right:'Rege dac în timpul războaielor'},{id:'traian',left:'Traian',right:'Împărat roman și conducător al campaniilor'},{id:'regia',left:'Sarmizegetusa Regia',right:'Centru politic și religios al regatului dac'},{id:'column',left:'Columna lui Traian',right:'Monument cu reliefuri ale războaielor'}],error:'Unele legături nu se potrivesc. Verifică din nou indiciile din sală.'},
      fact:'Dosarul istoric este complet: ai separat rolurile personajelor, funcția centrului dacic și valoarea narativă a Columnei lui Traian.'
    }
  ];

  const V=(x,y,z)=>[x,y,z];
  let overlay, state=null, gl=null, program=null, cubeMesh=null, sphereMesh=null, raf=0, last=0, frame=0, resizeObserver=null;
  let keys=new Set(),lastPointer=null,toastTimer=0,glUniforms=null;

  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function getRoom(id){return rooms[id]||rooms.archive}
  function activeRoom(){return !state?rooms.archive:state.stageIndex===0?state.room:state.room.chapters[state.stageIndex-1]}
  function chapterCount(room=state?.room){return 1+(room?.chapters?.length||0)}
  function mount(){
    if(overlay)return;
    overlay=document.createElement('div');overlay.className='escape3d-overlay';overlay.id='escape3dOverlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','escape3dRoomTitle');overlay.hidden=true;
    overlay.innerHTML=`
      <header class="escape3d-topbar"><div class="escape3d-brand"><span class="escape3d-brand-mark">◈</span><div class="escape3d-brand-copy"><small>LUMEN · ESCAPE ROOMS</small><strong id="escape3dTopTitle">Explorare 3D</strong></div></div><div class="escape3d-top-meta"><span id="escape3dClass">CLASA · VII-B</span><span class="demo-live">● MOD DEMO</span><button class="escape3d-close" id="escape3dClose" aria-label="Închide camera">×</button></div></header>
      <main class="escape3d-workspace"><section class="escape3d-view" id="escape3dView" aria-label="Cameră 3D explorabilă"><canvas class="escape3d-canvas" id="escape3dCanvas" tabindex="0" aria-label="Cameră tridimensională. Folosește tastele W A S D pentru deplasare și mișcă mouse-ul pentru a privi în jur, fără să ții apăsat."></canvas><div class="escape3d-view-hud"><span class="room-live">● SCENĂ 3D ACTIVĂ</span><span id="escape3dStageLabel">CAMERA 1 / 3</span><span id="escape3dPosition">POZIȚIA 01</span></div><div class="escape3d-crosshair" aria-hidden="true"></div><div id="escape3dNear" class="escape3d-near-label" hidden></div><div id="escape3dHotspots" class="escape3d-hotspots"></div><div id="escape3dToast" class="escape3d-toast" role="status" aria-live="polite"></div><div class="escape3d-mobile-controls" aria-label="Controale de deplasare"><button data-move="w" aria-label="Înainte">↑</button><button data-move="a" aria-label="Stânga">←</button><button data-move="s" aria-label="Înapoi">↓</button><button data-move="d" aria-label="Dreapta">→</button></div><div class="escape3d-action-bar"><button id="escape3dInspect" title="Inspectează obiectul apropiat">E · INSPECTEAZĂ</button><button id="escape3dReset">↺ REIA</button></div><div id="escape3dError" class="escape3d-render-error" hidden></div><div class="escape3d-complete" id="escape3dComplete"><div class="escape3d-complete-card"><span>✓</span><small id="escape3dWinKicker">CAMERA SECURIZATĂ</small><h2 id="escape3dWinTitle">Ieșirea s-a deschis.</h2><p id="escape3dWinText"></p><button id="escape3dNext">Continuă →</button></div></div></section>
      <aside class="escape3d-side"><div class="escape3d-side-head"><div class="escape3d-side-kicker" id="escape3dSubject">ISTORIE · CAZ DE ARHIVĂ</div><h2 id="escape3dRoomTitle">Arhiva celor trei sigilii</h2><p>Explorează camera 3D și cercetează fiecare obiect pentru a afla indicii.</p><div class="escape3d-objective"><b>◎</b><span id="escape3dObjective"></span></div></div><div class="escape3d-clue-head"><span>JURNAL DE INVESTIGAȚIE</span><b id="escape3dClueCount">0 / 4</b></div><div class="escape3d-clue-list" id="escape3dClueList"></div><div class="escape3d-lock-panel" id="escape3dPuzzle"></div><div class="escape3d-help"><b>WASD / ↑↓←→</b> deplasare · <b>mișcă mouse-ul</b> peste scenă pentru a roti camera, fără să ții clicul · <b>E</b> cercetează obiectul apropiat. Pe telefon folosește săgețile și glisează pe scenă.<br>Preset demonstrativ pentru gimnaziu · <a href="https://www.mnir.ro/istoria-unui-monument/" target="_blank" rel="noopener">sursa istorică · MNIR ↗</a> · <a href="https://www.edu.ro/Ordin_ministru_3393_2017" target="_blank" rel="noopener">programa oficială ↗</a>. Profesorul selectează manualul și unitatea studiate.</div></aside></main>`;
    document.body.append(overlay);
    overlay.addEventListener('click',onOverlayClick);
    overlay.addEventListener('keydown',onPuzzleKey);
    document.addEventListener('keydown',onKeyDown);document.addEventListener('keyup',onKeyUp);
    overlay.querySelectorAll('[data-move]').forEach(b=>{
      const down=e=>{e.preventDefault();keys.add(b.dataset.move)};
      const up=e=>{e.preventDefault();keys.delete(b.dataset.move)};
      b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('pointerleave',up);
    });
    $('#escape3dClose').onclick=closeRoom;$('#escape3dInspect').onclick=inspectNearest;
    $('#escape3dReset').onclick=()=>state&&start(state.room.id);
    $('#escape3dNext').onclick=()=>{if(!state)return;if(state.stageIndex+1<chapterCount())loadChapter(state.stageIndex+1);else closeRoom()};
    setupCanvasEvents();
  }
  const $=(selector,root=document)=>root.querySelector(selector.startsWith('#')||selector.startsWith('.')?selector:`#${selector}`);

  function onOverlayClick(e){
    const open=e.target.closest('[data-room-open]');if(open){start(open.dataset.roomOpen);return}
    const hot=e.target.closest('[data-hotspot]');if(hot){interact(hot.dataset.hotspot);return}
    const piece=e.target.closest('[data-piece]');if(piece){selectPiece(piece.dataset.piece);return}
    const slot=e.target.closest('[data-slot]');if(slot){placePiece(slot.dataset.slot);return}
    const wire=e.target.closest('[data-wire-piece]');if(wire){addWire(wire.dataset.wirePiece);return}
    const step=e.target.closest('[data-sequence]');if(step){appendSequence(step.dataset.sequence);return}
    const match=e.target.closest('[data-match-side]');if(match){chooseMatch(match.dataset.matchSide,match.dataset.matchId);return}
    if(e.target.closest('#escape3dCheckAssembly')){checkAssembly();return}
    if(e.target.closest('#escape3dCheckCircuit')){checkCircuit();return}
    if(e.target.closest('#escape3dCheckSequence')){checkSequence();return}
    if(e.target.closest('#escape3dResetSequence')){state.sequence=[];renderPuzzle();return}
    if(e.target.closest('#escape3dUndoSequence')){state.sequence.pop();renderPuzzle();return}
    if(e.target.closest('#escape3dCheckMatching')){checkMatching();return}
    if(e.target.closest('#escape3dUndoWire')){if(state?.wirePath.length)state.wirePath.pop();renderPuzzle();return}
    if(e.target.id==='escape3dCodeForm'||e.target.closest('#escape3dCodeForm')){return}
  }
  function onPuzzleKey(e){if(e.key==='Enter'&&e.target.id==='escape3dCode'){e.preventDefault();checkCode()}}
  function onKeyDown(e){
    if(!state||overlay?.hidden)return;
    const k=e.key.toLowerCase();
    if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)&&!['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))e.preventDefault();
    if(k==='escape'){closeRoom();return}
    if(k==='e'){inspectNearest();return}
    if(k.startsWith('arrow')){if(k==='arrowup')keys.add('w');if(k==='arrowdown')keys.add('s');if(k==='arrowleft')keys.add('a');if(k==='arrowright')keys.add('d')}else if(['w','a','s','d'].includes(k)&&!['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))keys.add(k);
  }
  function onKeyUp(e){const k=e.key.toLowerCase();if(k==='arrowup')keys.delete('w');else if(k==='arrowdown')keys.delete('s');else if(k==='arrowleft')keys.delete('a');else if(k==='arrowright')keys.delete('d');else keys.delete(k)}

  function start(id){
    mount();const room=getRoom(id);state={room,stageIndex:0,found:new Set(),yaw:0,pitch:-.035,pos:[0,1.62,5.15],selectedPiece:null,assembly:{},wirePath:[],sequence:[],matching:{},matchSelected:null,completed:false,door:0,toast:'',elapsed:0};
    document.body.style.overflow='hidden';overlay.hidden=false;$('#escape3dError').hidden=true;$('#escape3dToast').classList.remove('show');$('#escape3dToast').textContent='';clearTimeout(toastTimer);$('#escape3dClass').textContent=`CLASA · ${document.getElementById('classSelector')?.value||'VII-B'}`;
    loadChapter(0);keys.clear();
    try{initGL();resizeCanvas();if(raf)cancelAnimationFrame(raf);last=performance.now();raf=requestAnimationFrame(loop)}catch(err){showRenderError(err)}
    requestAnimationFrame(()=>$('#escape3dCanvas')?.focus({preventScroll:true}));
  }
  function loadChapter(index){
    if(!state)return;state.stageIndex=index;const r=activeRoom();state.found=new Set();state.selectedPiece=null;state.assembly={};state.wirePath=[];state.sequence=[];state.matching={};state.matchSelected=null;state.completed=false;state.door=0;state.pos=[0,1.62,5.15];state.yaw=0;state.pitch=-.035;state.elapsed=0;keys.clear();lastPointer=null;
    $('#escape3dTopTitle').textContent=state.room.title;$('#escape3dRoomTitle').textContent=r.title||state.room.title;$('#escape3dSubject').textContent=`CAMERA ${index+1}/${chapterCount()} · ${r.subject||state.room.subject}`;$('#escape3dObjective').textContent=r.objective;$('#escape3dStageLabel').textContent=`CAMERA ${index+1} / ${chapterCount()}`;$('#escape3dComplete').classList.remove('show');$('#escape3dToast').classList.remove('show');$('#escape3dToast').textContent='';renderClues();
  }
  function closeRoom(){if(!overlay||overlay.hidden)return;overlay.hidden=true;document.body.style.overflow='';keys.clear();if(raf)cancelAnimationFrame(raf);raf=0;if(resizeObserver){resizeObserver.disconnect();resizeObserver=null}state=null}
  function showRenderError(err){const box=$('escape3dError');box.hidden=false;box.innerHTML=`<div><b>Scena 3D indisponibilă în acest browser.</b><br>Activează accelerarea grafică hardware pentru WebGL și reîncarcă pagina.<br><small>${esc(err?.message||'WebGL nu a pornit.')}</small></div>`}
  function showToast(msg){const t=$('escape3dToast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}

  function renderClues(){
    if(!state)return;const r=activeRoom(),found=state.found;$('#escape3dClueCount').textContent=`${found.size} / ${r.clues.length}`;
    $('#escape3dClueList').innerHTML=r.clues.map(c=>{const done=found.has(c.id);return `<article class="escape3d-clue ${done?'is-found':''}"><strong>${done?'✓':'◌'} ${esc(c.name)}</strong><p>${done?esc(c.text):'Obiect necercetat · caută reperul în cameră'}</p></article>`}).join('');
    renderPuzzle();updateHotspotButtons();
  }
  function renderPuzzle(){
    if(!state)return;const r=activeRoom(),p=r.lock,ready=state.found.size===r.clues.length,box=$('escape3dPuzzle'),gate=`Cercetează toate cele ${r.clues.length} indicii pentru a activa mecanismul.`;
    if(p.kind==='code'){
      const fieldLabel=p.inputLabel||'Codul dosarului',fieldHint=p.placeholder||'COD';
      box.innerHTML=`<h3>▣ ${esc(p.title)}</h3><p>${esc(p.hint)}</p><form class="escape3d-puzzle-input" id="escape3dCodeForm"><input id="escape3dCode" inputmode="numeric" autocomplete="off" maxlength="6" aria-label="${esc(fieldLabel)}" placeholder="${esc(fieldHint)}" ${ready?'':'disabled'}><button type="submit" ${ready?'':'disabled'}>Descifrează</button></form><div class="escape3d-puzzle-msg" id="escape3dPuzzleMsg">${ready?'Codul poate fi introdus.':gate}</div>`;
      $('escape3dCodeForm').onsubmit=e=>{e.preventDefault();checkCode()};
    }else if(p.kind==='assembly'){
      const pieces=p.pieces||{membrane:'Membrană',cytoplasm:'Citoplasmă',nucleus:'Nucleu'},slots=p.slots||[['boundary','Limita celulei'],['inside','Mediul intern'],['control','Coordonarea activităților']],required=Object.keys(p.answer||{boundary:'membrane',inside:'cytoplasm',control:'nucleus'}),complete=required.every(k=>state.assembly[k]);
      box.innerHTML=`<h3>◉ ${esc(p.title)}</h3><p>${esc(p.hint)}</p>${ready?`<div class="escape3d-parts">${Object.entries(pieces).map(([id,name])=>`<button class="escape3d-piece ${state.selectedPiece===id?'selected':''}" draggable="true" data-piece="${esc(id)}">${esc(name)}</button>`).join('')}</div><div class="escape3d-drop-grid">${slots.map(([id,label])=>`<button class="escape3d-drop-slot ${state.assembly[id]?'filled':''}" data-slot="${esc(id)}"><span>${esc(label)}</span><b>${esc(pieces[state.assembly[id]]||'Așază structura')}</b></button>`).join('')}</div><button class="escape3d-puzzle-action" id="escape3dCheckAssembly" ${complete?'':'disabled'}>Activează modelul</button>`:`<div class="escape3d-puzzle-msg">${gate}</div>`}<div class="escape3d-puzzle-msg" id="escape3dPuzzleMsg">${ready?'Selectează o structură și apoi locul unde se potrivește.':'Indiciile din jurnal descriu funcția fiecărei piese.'}</div>`;
      if(ready)box.querySelectorAll('[data-piece]').forEach(b=>b.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',b.dataset.piece)));
      if(ready)box.querySelectorAll('[data-slot]').forEach(b=>{b.addEventListener('dragover',e=>e.preventDefault());b.addEventListener('drop',e=>{e.preventDefault();state.selectedPiece=e.dataTransfer.getData('text/plain');placePiece(b.dataset.slot)})});
    }else if(p.kind==='circuit'){
      const labels=p.labels||{battery:'BATERIE',switch:'ÎNTRERUPĂTOR',bulb:'BEC'},path=state.wirePath,answer=p.answer||['battery','switch','bulb'];
      box.innerHTML=`<h3>ϟ ${esc(p.title)}</h3><p>${esc(p.hint)}</p>${ready?`<div class="escape3d-parts">${Object.entries(labels).map(([id,name])=>`<button class="escape3d-piece" data-wire-piece="${esc(id)}" ${path.includes(id)?'disabled':''}>${esc(name)}</button>`).join('')}</div><div class="escape3d-circuit">${answer.map((id,i)=>`<div class="escape3d-circuit-node ${path[i]?'filled':''}">${esc(labels[path[i]]||['SURSĂ','CONTROL','BEC'][i]||'LEGĂTURĂ')}</div>${i<answer.length-1?'<span class="escape3d-circuit-arrow">→</span>':''}`).join('')}</div><button class="escape3d-puzzle-action" id="escape3dUndoWire" ${path.length?'':'disabled'}>Înapoi</button> <button class="escape3d-puzzle-action" id="escape3dCheckCircuit" ${path.length===answer.length?'':'disabled'}>Închide circuitul</button>`:`<div class="escape3d-puzzle-msg">${gate}</div>`}<div class="escape3d-puzzle-hint">${ready?esc(p.pathHint||'Așază componentele după rolul lor în circuit.'):''}</div>`;
    }else if(p.kind==='sequence'){
      const answer=p.answer,path=state.sequence;
      box.innerHTML=`<h3>⌁ ${esc(p.title)}</h3><p>${esc(p.hint)}</p>${ready?`<div class="escape3d-sequence-options">${p.options.map(o=>`<button class="escape3d-piece ${path.includes(o.id)?'selected':''}" data-sequence="${esc(o.id)}" ${path.includes(o.id)?'disabled':''}>${esc(o.label)}</button>`).join('')}</div><div class="escape3d-sequence-path">${answer.map((_,i)=>`<div class="escape3d-sequence-step ${path[i]?'filled':''}"><small>0${i+1}</small><b>${esc(p.options.find(o=>o.id===path[i])?.label||'Alege evenimentul')}</b></div>${i<answer.length-1?'<span>↓</span>':''}`).join('')}</div><button class="escape3d-puzzle-action" id="escape3dUndoSequence" ${path.length?'':'disabled'}>Înapoi un pas</button> <button class="escape3d-puzzle-action" id="escape3dCheckSequence" ${path.length===answer.length?'':'disabled'}>Verifică ordinea</button> <button class="escape3d-puzzle-action" id="escape3dResetSequence" ${path.length?'':'disabled'}>Reia</button>`:`<div class="escape3d-puzzle-msg">${gate}</div>`}<div class="escape3d-puzzle-msg" id="escape3dPuzzleMsg">${ready?'Construiește cronologia, apoi verifică fiecare etapă.':''}</div>`;
    }else if(p.kind==='matching'){
      const pairs=p.pairs,rights=[...pairs].reverse();
      box.innerHTML=`<h3>⌗ ${esc(p.title)}</h3><p>${esc(p.hint)}</p>${ready?`<div class="escape3d-match-board"><div><small>TERMEN / SURSĂ</small>${pairs.map(x=>`<button class="escape3d-match-item ${state.matchSelected===x.id?'selected':''} ${state.matching[x.id]?'filled':''}" data-match-side="left" data-match-id="${esc(x.id)}">${esc(x.left)}</button>`).join('')}</div><div><small>ROL / DESCRIERE</small>${rights.map(x=>`<button class="escape3d-match-item ${Object.values(state.matching).includes(x.id)?'filled':''}" data-match-side="right" data-match-id="${esc(x.id)}">${esc(x.right)}</button>`).join('')}</div></div><button class="escape3d-puzzle-action" id="escape3dCheckMatching" ${Object.keys(state.matching).length===pairs.length?'':'disabled'}>Verifică dosarul</button>`:`<div class="escape3d-puzzle-msg">${gate}</div>`}<div class="escape3d-puzzle-msg" id="escape3dPuzzleMsg">${ready?(state.matchSelected?'Alege descrierea asociată termenului selectat.':'Atinge un termen, apoi descrierea corectă.') :''}</div>`;
    }
  }
  function checkCode(){const r=activeRoom();if(!state||r.lock.kind!=='code'||state.found.size<r.clues.length)return;const input=$('escape3dCode'),msg=$('escape3dPuzzleMsg'),v=input?.value.trim();if(v===r.lock.answer){if(input)input.disabled=true;completeRoom()}else{if(msg)msg.textContent=r.lock.error||'Codul nu se potrivește cu indiciile. Reia calculul.';input?.select();showToast('Codul nu se potrivește. Mai verifică indiciile.') }}
  function selectPiece(id){if(!state||activeRoom().lock.kind!=='assembly')return;state.selectedPiece=id;renderPuzzle()}
  function placePiece(slot){if(!state||activeRoom().lock.kind!=='assembly'||!state.selectedPiece)return;state.assembly[slot]=state.selectedPiece;state.selectedPiece=null;renderPuzzle()}
  function checkAssembly(){if(!state)return;const p=activeRoom().lock,a=state.assembly,answer=p.answer||{boundary:'membrane',inside:'cytoplasm',control:'nucleus'},ok=Object.entries(answer).every(([slot,piece])=>a[slot]===piece);if(ok)completeRoom();else{$('escape3dPuzzleMsg').textContent=p.error||'O structură nu este în locul potrivit. Mută piesele și încearcă din nou.';showToast('Verifică funcția fiecărei structuri.') }}
  function addWire(id){if(!state||activeRoom().lock.kind!=='circuit')return;const p=activeRoom().lock,answer=p.answer||['battery','switch','bulb'];if(state.wirePath.includes(id)||state.wirePath.length>=answer.length)return;state.wirePath.push(id);renderPuzzle()}
  function checkCircuit(){if(!state)return;const p=activeRoom().lock,answer=p.answer||['battery','switch','bulb'];if(state.wirePath.join('|')===answer.join('|'))completeRoom();else{const hint=overlay.querySelector('.escape3d-puzzle-hint');if(hint)hint.textContent=p.error||'Traseul nu funcționează încă. Reordonează componentele după rol.';showToast('Traseul rămâne deschis. Reordonează componentele.') }}
  function appendSequence(id){if(!state)return;const p=activeRoom().lock;if(p.kind!=='sequence'||state.sequence.length>=p.answer.length)return;state.sequence.push(id);renderPuzzle()}
  function checkSequence(){if(!state)return;const p=activeRoom().lock;if(p.kind!=='sequence')return;if(state.sequence.join('|')===p.answer.join('|'))completeRoom();else{const msg=$('escape3dPuzzleMsg');if(msg)msg.textContent=p.error||'Ordinea nu este corectă. Compară din nou indiciile.';state.sequence=[];renderPuzzle();showToast('Cronologia nu se potrivește. Încearcă din nou.') }}
  function chooseMatch(side,id){if(!state)return;const p=activeRoom().lock;if(p.kind!=='matching')return;if(side==='left'){state.matchSelected=id;renderPuzzle();return}if(!state.matchSelected){showToast('Alege mai întâi un termen din coloana stângă.');return}for(const key of Object.keys(state.matching))if(state.matching[key]===id&&key!==state.matchSelected)delete state.matching[key];state.matching[state.matchSelected]=id;state.matchSelected=null;renderPuzzle()}
  function checkMatching(){if(!state)return;const p=activeRoom().lock;if(p.kind!=='matching')return;const ok=p.pairs.every(x=>state.matching[x.id]===x.id);if(ok)completeRoom();else{const msg=$('escape3dPuzzleMsg');if(msg)msg.textContent=p.error||'Unele asocieri nu se potrivesc. Recitește sursele.';showToast('Dosarul are asocieri greșite. Mai verifică.') }}
  function completeRoom(){if(!state||state.completed)return;state.completed=true;keys.clear();const final=state.stageIndex+1>=chapterCount(),no=state.stageIndex+1;$('#escape3dWinKicker').textContent=final?'CAZ REZOLVAT · 3 / 3 CAMERE':`CAMERA ${no} SECURIZATĂ · ${no} / ${chapterCount()}`;$('#escape3dWinTitle').textContent=final?'Dosarul istoric este complet.':`Camera ${no} s-a deschis.`;$('#escape3dWinText').textContent=activeRoom().fact;$('#escape3dNext').textContent=final?'Încheie cazul':'Intră în camera următoare →';$('#escape3dComplete').classList.add('show');showToast(final?'Caz rezolvat.':'Puzzle rezolvat. Poarta se deschide.')}

  function interact(id){if(!state||state.completed)return;const r=activeRoom(),clue=r.clues.find(x=>x.id===id);if(clue){if(state.found.has(id)){showToast(`${clue.name}: ${clue.text}`);return}state.found.add(id);renderClues();showToast(`Indiciu găsit · ${clue.name}`);return}
    if(id==='exit'){
      if(state.found.size<r.clues.length){showToast(`Mai sunt ${r.clues.length-state.found.size} obiecte de investigat.`);return}
      $('escape3dPuzzle').scrollIntoView({behavior:'smooth',block:'nearest'});showToast('Mecanism activ. Folosește indiciile pentru a rezolva puzzle-ul.');if(r.lock.kind==='code')setTimeout(()=>$('escape3dCode')?.focus({preventScroll:true}),300);return;
    }
  }
  function updateHotspotButtons(){if(!state)return;const r=activeRoom(),host=$('escape3dHotspots'),defs=[...r.clues.map(x=>({id:x.id,label:x.name,found:state.found.has(x.id),at:x.at})),{id:'exit',label:state.completed?'Poartă deschisă':'Mecanism de ieșire',found:state.completed,at:r.lock.at}];host.innerHTML=defs.map(x=>`<button class="escape3d-hotspot ${x.found?'found':''}" data-hotspot="${x.id}" data-world="${x.at.join(',')}" ${state.completed&&x.id==='exit'?'disabled':''}>${esc(x.label)}</button>`).join('');}
  function inspectNearest(){if(!state)return;const obj=nearestObject();if(!obj){showToast('Apropie-te de un reper marcat ca să îl inspectezi.');return}interact(obj.id)}
  function nearestObject(){if(!state)return null;const r=activeRoom(),p=state.pos,all=[...r.clues.filter(x=>!state.found.has(x.id)).map(x=>({id:x.id,at:x.at})),{id:'exit',at:r.lock.at}];let best=null,d=Infinity;for(const o of all){const dd=Math.hypot(p[0]-o.at[0],p[2]-o.at[2]);if(dd<d){d=dd;best=o}}return d<3.25?best:null}

  function setupCanvasEvents(){
    const canvas=()=>$('escape3dCanvas'),view=$('escape3dView');
    view.addEventListener('pointermove',e=>{
      if(!state||overlay.hidden)return;
      const previous=lastPointer;if(!previous||previous.id!==e.pointerId){lastPointer={x:e.clientX,y:e.clientY,id:e.pointerId};return}
      const dx=e.clientX-previous.x,dy=e.clientY-previous.y;lastPointer={x:e.clientX,y:e.clientY,id:e.pointerId};
      if(e.target.closest('.escape3d-action-bar,.escape3d-complete,.escape3d-hotspot'))return;
      state.yaw+=dx*.0022;state.pitch=Math.max(-.5,Math.min(.4,state.pitch-dy*.0026));
    });
    view.addEventListener('pointerleave',()=>{lastPointer=null});
    view.addEventListener('click',e=>{
      if(!state||e.target!==canvas())return;const rect=canvas().getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top,r=activeRoom();let best=null,bd=58;
      for(const o of [...r.clues,{id:'exit',at:r.lock.at}]){const p=projectWorld(o.at,rect.width,rect.height);if(!p||p.z<=0)continue;const dd=Math.hypot(mx-p.x,my-p.y);if(dd<bd){bd=dd;best=o}}
      if(best)interact(best.id);
    });
    canvas().addEventListener('contextmenu',e=>e.preventDefault());
  }

  /* Small self-contained WebGL 1 renderer: no CDN or downloaded models required. */
  function initGL(){
    const canvas=$('escape3dCanvas');if(!canvas)throw Error('Nu s-a găsit suprafața scenei.');
    gl=canvas.getContext('webgl',{antialias:true,alpha:false,depth:true,powerPreference:'high-performance'})||canvas.getContext('experimental-webgl');if(!gl)throw Error('WebGL nu este disponibil.');
    if(!program){program=createProgram(gl);gl.useProgram(program);glUniforms={pos:gl.getAttribLocation(program,'aPosition'),normal:gl.getAttribLocation(program,'aNormal'),projection:gl.getUniformLocation(program,'uProjection'),view:gl.getUniformLocation(program,'uView'),model:gl.getUniformLocation(program,'uModel'),scale:gl.getUniformLocation(program,'uScale'),tint:gl.getUniformLocation(program,'uTint'),glow:gl.getUniformLocation(program,'uGlow'),light:gl.getUniformLocation(program,'uLight')};cubeMesh=createCube(gl);sphereMesh=createSphere(gl);}
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);gl.clearColor(.035,.045,.06,1);resizeObserver?.disconnect();resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(canvas.parentElement);
  }
  function createProgram(g){
    const vs=`attribute vec3 aPosition;attribute vec3 aNormal;uniform mat4 uProjection;uniform mat4 uView;uniform mat4 uModel;uniform vec3 uScale;varying vec3 vNormal;varying vec3 vWorld;void main(){vec3 p=aPosition*uScale;vec4 world=uModel*vec4(p,1.0);vWorld=world.xyz;vNormal=normalize(mat3(uModel)*aNormal);gl_Position=uProjection*uView*world;}`;
    const fs=`precision mediump float;uniform vec3 uTint;uniform float uGlow;uniform vec3 uLight;varying vec3 vNormal;varying vec3 vWorld;void main(){float d=max(dot(normalize(vNormal),normalize(uLight)),0.0);float shade=0.52+0.48*d;float fog=clamp((length(vWorld.xz)-3.0)/13.0,0.0,0.18);vec3 color=uTint*shade+uTint*uGlow;color=mix(color,vec3(0.035,0.045,0.06),fog);gl_FragColor=vec4(color,1.0);}`;
    const compile=(type,src)=>{const s=g.createShader(type);g.shaderSource(s,src);g.compileShader(s);if(!g.getShaderParameter(s,g.COMPILE_STATUS))throw Error(g.getShaderInfoLog(s)||'Shader error');return s};
    const p=g.createProgram();g.attachShader(p,compile(g.VERTEX_SHADER,vs));g.attachShader(p,compile(g.FRAGMENT_SHADER,fs));g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw Error(g.getProgramInfoLog(p)||'WebGL link error');return p;
  }
  function createMesh(g,data){const b=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,b);g.bufferData(g.ARRAY_BUFFER,new Float32Array(data),g.STATIC_DRAW);return{buffer:b,count:data.length/6}}
  function createCube(g){const d=[],faces=[[[0,0,1],[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]],[[0,0,-1],[[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5]]],[[1,0,0],[[.5,-.5,.5],[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5]]],[[-1,0,0],[[-.5,-.5,-.5],[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5]]],[[0,1,0],[[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5]]],[[0,-1,0],[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5],[-.5,-.5,.5]]]];for(const [n,v] of faces)for(const i of [0,1,2,0,2,3])d.push(...v[i],...n);return createMesh(g,d)}
  function createSphere(g){const d=[],lat=12,lon=18;for(let y=0;y<lat;y++){const a0=Math.PI*y/lat,a1=Math.PI*(y+1)/lat;for(let x=0;x<lon;x++){const b0=2*Math.PI*x/lon,b1=2*Math.PI*(x+1)/lon;const pt=(a,b)=>[Math.sin(a)*Math.cos(b),Math.cos(a),Math.sin(a)*Math.sin(b)];const q=[pt(a0,b0),pt(a1,b0),pt(a1,b1),pt(a0,b0),pt(a1,b1),pt(a0,b1)];q.forEach(p=>d.push(...p,...p))}}return createMesh(g,d)}
  function resizeCanvas(){if(!gl||!state)return;const c=$('escape3dCanvas'),r=c.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.75),w=Math.max(1,Math.floor(r.width*dpr)),h=Math.max(1,Math.floor(r.height*dpr));if(c.width!==w||c.height!==h){c.width=w;c.height=h}gl.viewport(0,0,w,h)}
  function matModel(pos,angle=0){const c=Math.cos(angle),s=Math.sin(angle);return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,pos[0],pos[1],pos[2],1])}
  function matPerspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0])}
  function matView(pos,yaw,pitch){const cp=Math.cos(pitch),sp=Math.sin(pitch),sy=Math.sin(yaw),cy=Math.cos(yaw),forward=[sy*cp,sp,-cy*cp],right=[cy,0,sy],up=[-sy*sp,cp,cy*sp];return new Float32Array([right[0],up[0],-forward[0],0,right[1],up[1],-forward[1],0,right[2],up[2],-forward[2],0,-dot(right,pos),-dot(up,pos),dot(forward,pos),1])}
  function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}
  function multiply(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o}
  function projectWorld(p,w,h){if(!state)return null;const yaw=state.yaw,pitch=state.pitch,cp=Math.cos(pitch),sp=Math.sin(pitch),sy=Math.sin(yaw),cy=Math.cos(yaw),f=[sy*cp,sp,-cy*cp],right=[cy,0,sy],up=[-sy*sp,cp,cy*sp],d=[p[0]-state.pos[0],p[1]-state.pos[1],p[2]-state.pos[2]],z=dot(f,d);if(z<=.08)return null;const x=dot(right,d),y=dot(up,d),tan=Math.tan(68*Math.PI/360),aspect=w/h;return{x:w/2+x/(z*tan*aspect)*w/2,y:h/2-y/(z*tan)*h/2,z}}
  function box(pos,scale,color,opts={}){drawMesh(cubeMesh,pos,scale,color,opts.glow||0,opts.angle||0)}
  function sphere(pos,scale,color,glow=0){drawMesh(sphereMesh,pos,scale,color,glow,0)}
  function drawMesh(mesh,pos,scale,color,glow=0,angle=0){const g=gl,u=glUniforms;g.bindBuffer(g.ARRAY_BUFFER,mesh.buffer);g.enableVertexAttribArray(u.pos);g.enableVertexAttribArray(u.normal);g.vertexAttribPointer(u.pos,3,g.FLOAT,false,24,0);g.vertexAttribPointer(u.normal,3,g.FLOAT,false,24,12);g.uniformMatrix4fv(u.model,false,matModel(pos,angle));g.uniform3f(u.scale,scale[0],scale[1],scale[2]);g.uniform3f(u.tint,color[0],color[1],color[2]);g.uniform1f(u.glow,glow);g.drawArrays(g.TRIANGLES,0,mesh.count)}

  function loop(now){if(!state||overlay.hidden||!gl){raf=0;return}raf=requestAnimationFrame(loop);try{const dt=Math.min(.05,(now-last)/1000);last=now;state.elapsed+=dt;frame++;movePlayer(dt);resizeCanvas();renderScene(dt);if(frame%3===0)positionHotspots()}catch(err){cancelAnimationFrame(raf);raf=0;showRenderError(err)}}
  function movePlayer(dt){if(!keys.size||state.completed)return;const f=(keys.has('w')?1:0)-(keys.has('s')?1:0),side=(keys.has('d')?1:0)-(keys.has('a')?1:0);if(!f&&!side)return;const n=Math.hypot(f,side)||1,speed=3.25*dt/n,sy=Math.sin(state.yaw),cy=Math.cos(state.yaw);state.pos[0]+=(f*sy+side*cy)*speed;state.pos[2]+=(-f*cy+side*sy)*speed;state.pos[0]=Math.max(-5.25,Math.min(5.25,state.pos[0]));state.pos[2]=Math.max(-6.25,Math.min(6.25,state.pos[2]))}
  function renderScene(dt){
    const g=gl,c=$('escape3dCanvas'),room=activeRoom(),width=12,depth=14,back=-depth/2,front=depth/2;g.useProgram(program);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);const proj=matPerspective(68*Math.PI/180,c.width/c.height,.08,42),view=matView(state.pos,state.yaw,state.pitch);g.uniformMatrix4fv(glUniforms.projection,false,proj);g.uniformMatrix4fv(glUniforms.view,false,view);g.uniform3f(glUniforms.light,.32,.9,.42);
    const w=room.wall,f=room.floor,t=room.tone;
    box([0,-.13,0],[width,.25,depth],f);box([0,4.55,0],[width,.18,depth],[w[0]*.65,w[1]*.66,w[2]*.7]);
    box([0,2.25,back],[width,4.5,.2],w);box([0,2.25,front],[width,4.5,.2],[w[0]*.87,w[1]*.9,w[2]*.94]);box([-width/2,2.25,0],[.2,4.5,depth],[w[0]*.87,w[1]*.9,w[2]*.94]);box([width/2,2.25,0],[.2,4.5,depth],[w[0]*.8,w[1]*.88,w[2]*.92]);
    for(let x=-5.5;x<=5.5;x+=1.1){box([x,.006,0],[.018,.012,depth-.3],[t[0]*.27,t[1]*.27,t[2]*.27])}
    box([0,4.23,back+.14],[width-.3,.08,.07],[t[0]*.75,t[1]*.71,t[2]*.62]);
    box([-.9,1.42,back+.18],[.16,2.94,.24],[t[0]*.62,t[1]*.58,t[2]*.5]);box([.9,1.42,back+.18],[.16,2.94,.24],[t[0]*.62,t[1]*.58,t[2]*.5]);box([0,2.88,back+.18],[1.95,.16,.24],[t[0]*.68,t[1]*.62,t[2]*.55]);
    const doorAngle=state.completed?Math.min(1.22,state.door):0;if(state.completed)state.door=Math.min(1.22,state.door+dt*1.4);
    box([0,1.42,back+.31],[1.68,2.76,.09],state.completed?[.13,.31,.22]:[t[0]*.72,t[1]*.6,t[2]*.47],{angle:doorAngle,glow:state.completed?.12:0});
    box([.64,1.45,back+.42],[.075,.075,.065],state.completed?[.4,.9,.62]:[.94,.69,.27],{glow:.35});
    box([-3.2,4.19,back+.12],[1.35,.06,.06],[t[0]*.45,t[1]*.4,t[2]*.32]);box([3.2,4.19,back+.12],[1.35,.06,.06],[t[0]*.45,t[1]*.4,t[2]*.32]);
    // Overhead fixture and soft pools of light.
    box([0,4.18,.1],[1.15,.12,.42],[t[0]*.76,t[1]*.7,t[2]*.54],{glow:.36});sphere([0,3.95,.1],[.85,.1,.58],[t[0]*.75,t[1]*.61,t[2]*.46],.24);
    // Common work table and shelves give the room real scale and depth.
    const table=room.decor==='cell'?[.16,.42,.3]:room.decor==='signal'?[.19,.25,.46]:[.35,.28,.19];
    box([0,.76,-.2],[2.7,.13,1.16],table);for(const x of [-1.16,1.16])for(const z of [-.63,.23])box([x,.39,z],[.12,.74,.12],[table[0]*.72,table[1]*.72,table[2]*.7]);
    box([-3.45,1.36,-1.35],[.55,2.55,1.35],[w[0]*.75,w[1]*.68,w[2]*.66]);for(let y=.47;y<2.5;y+=.52)box([-3.13,y,-1.35],[.08,.055,1.3],[t[0]*.65,t[1]*.57,t[2]*.47]);
    for(let i=0;i<5;i++)box([-3.39,.62+i*.36,-1.12-(i%2)*.39],[.13,.2,.23],i%2?[t[0]*.7,t[1]*.59,t[2]*.48]:[.22,.37,.35]);
    // Room-specific furniture and clue models.
    if(room.decor==='archive')drawArchive(room,t);
    if(room.id==='cell')drawCell(room,t);
    if(room.id==='signal')drawSignal(room,t);
    if(room.id==='math')drawMath(room,t);
    if(room.decor==='vault')drawArchiveVault(room,t);
    if(room.decor==='gallery')drawArchiveGallery(room,t);
    drawClueStations(room,t);
    drawExitConsole(room,t);
    // Subtle animated marker lights help connect 3D objects with the clue journal.
    for(let i=0;i<room.clues.length;i++){const p=room.clues[i].at;if(!state.found.has(room.clues[i].id)){const pulse=.09+Math.sin(state.elapsed*2.4+i)*.025;sphere([p[0],p[1]+.26,p[2]],[.06,.06,.06],[t[0]*1.1+.08,t[1]*1.05+.06,t[2]*.9+.04],pulse)}}
  }
  function drawArchive(r,t){
    // Wall map, archival folio and a stamped coin.
    box([-1.8,2.13,-3.82],[1.2,.82,.08],[.34,.29,.19]);box([-1.8,2.13,-3.76],[1.07,.68,.025],[.69,.53,.29]);
    for(let i=0;i<5;i++)box([-2.12+i*.16,2.12+Math.sin(i*1.1)*.12,-3.73],[.022,.32+(i%2)*.16,.012],[.25,.43,.3]);
    box([-2.25,.91,-1.48],[.42,.08,.33],[.45,.31,.16]);box([-2.25,1.01,-1.48],[.3,.1,.22],[.76,.59,.34],{angle:-.17});
    box([1.05,.9,-.15],[.54,.06,.42],[.45,.3,.16]);sphere([1.05,1.01,-.15],[.12,.027,.12],[.84,.65,.27],.17);
    box([2.75,1.05,-1.7],[.95,.1,.45],[.39,.27,.15]);box([2.75,1.78,-1.91],[.95,1.4,.12],[.31,.25,.18]);for(let y=1.3;y<2.4;y+=.35)box([2.24,y,-1.83],[.95,.045,.1],[.65,.48,.26]);
  }
  function drawArchiveVault(r,t){
    // A deeper records vault: repeated bays, timeline panels and a central evidence table.
    for(const x of [-4.85,4.85]){box([x,1.72,-.7],[.42,3.3,8.4],[.28,.22,.15]);for(let z=-4.2;z<=3.2;z+=1.45){box([x+(x<0?.24:-.24),1.2,z],[.12,.07,1.2],[.7,.52,.25]);box([x+(x<0?.24:-.24),2.1,z],[.12,.07,1.2],[.7,.52,.25]);box([x+(x<0?.24:-.24),3,z],[.12,.07,1.2],[.7,.52,.25]);}}
    for(let i=0;i<4;i++){const x=-3.1+i*2.05;box([x,2.15,-6.78],[1.2,1.25,.06],[.4,.31,.18]);box([x,2.15,-6.72],[1.05,1.08,.025],[.75,.57,.29]);box([x,1.42,-6.69],[1.1,.055,.08],[.78,.64,.36]);}
    box([0,.89,-.7],[3.7,.16,1.5],[.43,.31,.18]);for(const x of [-1.55,1.55])for(const z of [-1.25,-.15])box([x,.43,z],[.13,.86,.13],[.3,.23,.15]);
  }
  function drawArchiveGallery(r,t){
    // A final exhibit hall with lit vitrines, stone plinths and archival panels.
    for(const x of [-4.9,4.9])for(const z of [-3.7,0,3.7]){box([x,2.05,z],[.38,4.1,.38],[.34,.29,.18]);box([x,4.12,z],[.7,.16,.7],[.67,.52,.3]);}
    for(let i=0;i<4;i++){const x=-3.25+i*2.15;box([x,2.05,-6.77],[1.25,1.45,.08],[.32,.26,.19]);box([x,2.05,-6.69],[1.04,1.19,.045],[.64,.47,.26],{glow:.05});box([x,1.22,-6.62],[1.2,.1,.16],[.78,.61,.34]);}
    for(const z of [-3.6,0,3.6]){box([0,.68,z],[2.8,.14,1.25],[.35,.28,.2]);for(const x of [-1.2,1.2])box([x,.34,z],[.13,.68,.13],[.28,.22,.16]);}
    box([0,3.3,-6.7],[5.6,.1,.08],[.77,.59,.31],{glow:.12});
  }
  function drawClueStations(r,t){
    for(const [i,c] of r.clues.entries())if(c.station){const [x,,z]=c.at,accent=i%2?[.77,.59,.3]:[.47,.61,.78];box([x,.28,z],[.84,.52,.84],[.25,.22,.18]);box([x,.57,z],[.92,.08,.92],[.49,.37,.23]);box([x,.88,z],[.66,.5,.58],[.32,.27,.2]);box([x,.91,z],[.52,.34,.44],accent,{glow:.07});box([x,.69,z],[.73,.06,.73],[.7,.54,.29]);sphere([x,1.22,z],[.14,.15,.14],accent,.14);}
  }
  function drawCell(r,t){
    // Glassware, microscope silhouette, transparent-looking cell model.
    box([-2.35,.84,-.9],[.7,.12,.56],[.19,.38,.32]);box([-2.32,1.16,-.9],[.22,.49,.14],[.31,.49,.38]);box([-2.3,1.43,-.9],[.38,.12,.17],[.43,.63,.47]);box([-2.3,1.5,-.9],[.24,.07,.2],[.7,.87,.71],{glow:.16});
    sphere([.2,1.08,-.55],[.25,.21,.25],[.31,.76,.61],.15);box([.2,1.34,-.55],[.18,.2,.14],[.62,.87,.72],{glow:.12});
    box([2.15,2.07,-3.82],[.98,.85,.07],[.14,.37,.3]);sphere([2.15,2.08,-3.75],[.34,.28,.1],[.39,.91,.65],.19);sphere([2.15,2.08,-3.64],[.13,.13,.12],[.82,.72,.38],.25);sphere([1.85,1.94,-3.63],[.07,.07,.07],[.83,.66,.37],.2);sphere([2.47,2.21,-3.63],[.07,.07,.07],[.83,.66,.37],.2);
    for(let i=0;i<4;i++)box([-.8+i*.46,.85,-.36],[.26,.24,.18],i%2?[.43,.28,.52]:[.29,.57,.43],{glow:.06});
  }
  function drawSignal(r,t){
    // A clear battery, three-part wall wiring and bulb.
    box([-2.45,.88,-.9],[.55,.35,.38],[.28,.39,.74]);box([-2.45,1.1,-.9],[.12,.08,.1],[.87,.39,.31],{glow:.16});box([-2.25,1.1,-.9],[.12,.08,.1],[.37,.68,.9],{glow:.16});
    box([2.45,.95,-.75],[.63,.34,.12],[.28,.37,.67]);box([2.45,1.19,-.75],[.06,.29,.08],[.67,.78,.98]);box([2.45,1.34,-.75],[.28,.06,.1],[.47,.65,.94]);
    box([-2.1,2.15,-3.82],[.75,.62,.1],[.21,.28,.43]);sphere([-2.1,2.15,-3.7],[.23,.23,.22],[.8,.87,1],.32);box([-2.1,1.86,-3.7],[.08,.25,.08],[.65,.74,.92]);
    box([0,2.05,-3.83],[1.35,.62,.08],[.2,.28,.45]);for(let i=0;i<4;i++)box([-.48+i*.32,2.05,-3.76],[.035,.42,.025],i<3?[.36,.52,.82]:[.27,.75,.64],{glow:.12});
    for(let i=0;i<4;i++)box([-1.1+i*.62,1.04,-.25],[.45,.035,.035],i<3?[.22,.43,.74]:[.18,.62,.48],{glow:.12});
  }
  function drawMath(r,t){
    box([-1.85,2.11,-3.82],[1.48,.86,.08],[.2,.19,.32]);box([-1.85,2.11,-3.75],[1.34,.7,.025],[.15,.33,.3],{glow:.12});
    for(let i=0;i<5;i++)box([-2.3+i*.23,2.11,-3.7],[.025,.2+(i%2)*.12,.015],[.56,.88,.73],{glow:.13});
    box([-2.35,.83,-1.1],[.88,.07,.5],[.3,.25,.41]);box([-2.35,1.2,-1.1],[.04,.64,.04],[.72,.62,.93]);box([-2.64,1.53,-1.1],[.62,.05,.05],[.8,.7,.94]);box([-2.66,1.38,-1.1],[.06,.23,.06],[.74,.68,.88]);box([-2.04,1.38,-1.1],[.06,.23,.06],[.74,.68,.88]);sphere([-2.66,1.25,-1.1],[.11,.1,.11],[.84,.72,.99],.12);sphere([-2.04,1.25,-1.1],[.11,.1,.11],[.84,.72,.99],.12);
    box([1.05,.9,-.15],[.66,.07,.48],[.3,.25,.41]);box([1.05,1.02,-.15],[.42,.08,.3],[.62,.51,.77],{angle:-.16});box([1.05,1.08,-.15],[.06,.015,.22],[.93,.83,.68],{glow:.12});
  }
  function drawExitConsole(r,t){const p=r.lock.at,lit=state.found.size===r.clues.length;box([p[0],p[1],p[2]],[.56,.72,.12],r.id==='cell'?[.18,.48,.35]:r.id==='signal'?[.24,.35,.7]:[.49,.37,.21]);for(let i=0;i<3;i++)sphere([p[0]-.16+i*.16,p[1]+.12,p[2]+.07],[.05,.05,.03],lit?[.25,.9,.58]:[.8,.45,.2],lit?.3:.08);box([p[0],p[1]-.17,p[2]+.072],[.32,.05,.025],state.completed?[.4,.9,.62]:[.48,.54,.62],{glow:state.completed?.35:.04})}

  function positionHotspots(){if(!state)return;const canvas=$('escape3dCanvas'),r=canvas.getBoundingClientRect(),host=$('escape3dHotspots');if(!r.width||!r.height)return;host.querySelectorAll('[data-world]').forEach(b=>{const world=b.dataset.world.split(',').map(Number),p=projectWorld(world,r.width,r.height),dist=Math.hypot(state.pos[0]-world[0],state.pos[2]-world[2]);if(!p||p.z>11||p.x<-90||p.x>r.width+90||p.y<-40||p.y>r.height+40){b.hidden=true;return}b.hidden=false;b.style.left=`${p.x}px`;b.style.top=`${p.y}px`;b.classList.toggle('near',dist<3.25);b.style.opacity=String(Math.max(.35,1-p.z/15))});const near=nearestObject(),label=$('escape3dNear'),room=activeRoom();if(near){const data=room.clues.find(x=>x.id===near.id);label.hidden=false;label.textContent=`E · ${data?.name||'Mecanism de ieșire'}`}else label.hidden=true;$('#escape3dPosition').textContent=`X ${state.pos[0].toFixed(1)} · Z ${state.pos[2].toFixed(1)}`}

  document.addEventListener('click',e=>{const b=e.target.closest('[data-room-open]');if(b)start(b.dataset.roomOpen)});
  window.startEscapeRoom=start;
  window.escapeRoomPresets=Object.keys(rooms);
})();
