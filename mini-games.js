/* LUMEN · two self-contained learning games: food-web builder and equation balance lab. */
(()=>{
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let overlay=null,state=null;
  const ecoNodes=[
    {id:'grass',name:'Iarbă',role:'PRODUCĂTOR',icon:'♧',x:14,y:39},
    {id:'hopper',name:'Lăcustă',role:'CONSUMATOR PRIMAR',icon:'✳',x:37,y:17},
    {id:'rabbit',name:'Iepure',role:'CONSUMATOR PRIMAR',icon:'◉',x:37,y:65},
    {id:'frog',name:'Broască',role:'CONSUMATOR SECUNDAR',icon:'◉',x:60,y:17},
    {id:'fox',name:'Vulpe',role:'CONSUMATOR',icon:'✦',x:82,y:40},
    {id:'remains',name:'Resturi organice',role:'MATERIE ORGANICĂ',icon:'⌁',x:60,y:76},
    {id:'fungi',name:'Ciuperci',role:'DESCOMPUNĂTOR',icon:'❋',x:82,y:76}
  ];
  const ecoEdges=[
    {id:'grass>hopper',from:'grass',to:'hopper',explain:'Lăcusta consumă plante. În această schemă, săgeata arată direcția transferului de materie și energie: de la hrană la consumator.'},
    {id:'grass>rabbit',from:'grass',to:'rabbit',explain:'Iepurele este erbivor și se hrănește cu plante. Iarba este producătorul din această relație.'},
    {id:'hopper>frog',from:'hopper',to:'frog',explain:'Broasca poate consuma insecte, inclusiv lăcuste. Ea ocupă un nivel de consumator superior în acest lanț simplificat.'},
    {id:'rabbit>fox',from:'rabbit',to:'fox',explain:'Vulpea se poate hrăni cu iepuri. O specie poate participa la mai multe relații trofice.'},
    {id:'frog>fox',from:'frog',to:'fox',explain:'În acest model de pajiște, vulpea se poate hrăni și cu broaște. O rețea trofică unește mai multe lanțuri.'},
    {id:'remains>fungi',from:'remains',to:'fungi',explain:'Ciupercile descompun resturi organice. Materia este reciclată în ecosistem; energia nu circulă în același ciclu.'}
  ];
  const mathLevels=[
    {title:'Încuietoarea simplă',story:'Izolează necunoscuta păstrând egalitatea.',left:'x + 7',right:'12',resultLeft:'x',resultRight:'5',hint:'Anulează adunarea lui 7 cu operația inversă. Aplică aceeași scădere ambelor părți.',steps:[{id:'minus7',label:'Scad 7 din ambele părți',afterLeft:'x',afterRight:'12 − 7',why:'Am scăzut 7 pe ambele părți, deci egalitatea s-a păstrat. Acum calculăm 12 − 7 = 5.'}],options:[['minus7','− 7 pe ambele părți'],['plus7','+ 7 pe ambele părți'],['times7','× 7 pe ambele părți'],['divide7','÷ 7 pe ambele părți']]},
    {title:'Dosarul coeficientului',story:'Elimină mai întâi termenul adăugat, apoi coeficientul lui x.',left:'3x + 4',right:'19',resultLeft:'x',resultRight:'5',hint:'Păstrează ordinea: elimină termenul liber 4; apoi împarte ambii membri la coeficientul 3.',steps:[{id:'minus4',label:'Scad 4 din ambele părți',afterLeft:'3x',afterRight:'15',why:'Scădem 4 pe ambele părți: 3x = 15. Necunoscuta este încă înmulțită cu 3.'},{id:'divide3',label:'Împart ambele părți la 3',afterLeft:'x',afterRight:'5',why:'Împărțim ambii membri la 3: x = 5. Verificare: 3 × 5 + 4 = 19.'}],options:[['minus4','− 4 pe ambele părți'],['plus4','+ 4 pe ambele părți'],['divide3','÷ 3 pe ambele părți'],['times3','× 3 pe ambele părți']]},
    {title:'Seiful parantezelor',story:'Desfă paranteza cu operații inverse și justifică fiecare transformare.',left:'2(x + 3)',right:'18',resultLeft:'x',resultRight:'6',hint:'Înlătură mai întâi factorul exterior 2. După aceea izolează x din paranteză.',steps:[{id:'divide2',label:'Împart ambele părți la 2',afterLeft:'x + 3',afterRight:'9',why:'Împărțind ambii membri la 2, obținem x + 3 = 9.'},{id:'minus3',label:'Scad 3 din ambele părți',afterLeft:'x',afterRight:'6',why:'Scădem 3 din ambii membri: x = 6. Verificare: 2 × (6 + 3) = 18.'}],options:[['divide2','÷ 2 pe ambele părți'],['minus3','− 3 pe ambele părți'],['plus3','+ 3 pe ambele părți'],['times2','× 2 pe ambele părți']]}
  ];

  function mount(){
    if(overlay)return;
    overlay=document.createElement('div');overlay.className='lumen-game-overlay';overlay.id='lumenMiniGame';overlay.hidden=true;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','lumenGameTitle');
    overlay.innerHTML=`<header class="lumen-game-topbar"><a class="lumen-game-brand" href="#acasa"><span>◈</span><b>LUMEN<small>ARCADE · MOD DEMO</small></b></a><div class="lumen-game-class" id="lumenGameClass">CLASA · VII-B</div><button class="lumen-game-close" data-mini-action="close" aria-label="Închide jocul">×</button></header><main class="lumen-game-main"><div id="lumenGameContent"></div></main>`;
    document.body.append(overlay);
    overlay.addEventListener('click',onClick);
    overlay.addEventListener('input',onInput);
    document.addEventListener('keydown',onKey);
  }
  function open(id){
    if(!['ecosystem','equation'].includes(id))return;mount();state=id==='ecosystem'?{id,phase:1,links:new Set(),selected:null,message:'Alege organismul de la care pornește relația, apoi ceea ce se hrănește cu el.',simValue:100,simChanged:false,done:false}:{id,level:0,step:0,solved:false,done:false,message:'Alege piesa operațională care păstrează echilibrul.'};
    overlay.hidden=false;document.body.style.overflow='hidden';$('#lumenGameClass').textContent=`CLASA · ${document.getElementById('classSelector')?.value||'VII-B'}`;render();
  }
  function close(){if(!overlay||overlay.hidden)return;overlay.hidden=true;document.body.style.overflow='';state=null}
  function onKey(e){if(e.key==='Escape'&&overlay&&!overlay.hidden)close()}
  function onClick(e){
    if(e.target.closest('[data-mini-action="close"]')){close();return}
    if(!state)return;
    const node=e.target.closest('[data-eco-node]');if(node){chooseEco(node.dataset.ecoNode);return}
    const op=e.target.closest('[data-math-op]');if(op){applyMath(op.dataset.mathOp);return}
    const action=e.target.closest('[data-game-action]');if(action){gameAction(action.dataset.gameAction);return}
  }
  function onInput(e){if(e.target.id==='ecoPlantRange'&&state?.id==='ecosystem')updateEcoSimulation(Number(e.target.value))}
  function render(){if(!state)return;$('#lumenGameContent').innerHTML=state.id==='ecosystem'?renderEco():renderMath()}
  function renderEco(){
    if(state.done)return `<section class="mini-finish"><div class="mini-finish-icon">✓</div><small>INVESTIGAȚIE ÎNCHEIATĂ · BIOLOGIE</small><h1 id="lumenGameTitle">Rețeaua este vie.</h1><p>Ai urmărit relațiile dintre producători, consumatori și descompunători și ai observat în model cum o schimbare la bază se propagă în rețea.</p><div class="mini-finish-actions"><button class="mini-primary" data-game-action="restart-eco">Reia investigația</button><button class="mini-secondary" data-mini-action="close">Înapoi la jocuri</button></div></section>`;
    const isSimulation=state.phase===2;
    const coords={grass:[150,230],hopper:[370,105],rabbit:[370,375],frog:[600,105],fox:[820,235],remains:[600,470],fungi:[820,470]};
    const lines=[['grass','hopper'],['grass','rabbit'],['hopper','frog'],['rabbit','fox'],['frog','fox'],['remains','fungi']].map(([a,b])=>{const edge=ecoEdges.find(x=>x.from===a&&x.to===b);if(!state.links.has(edge.id))return'';const [x1,y1]=coords[a],[x2,y2]=coords[b];return `<path class="eco-flow" d="M ${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}" marker-end="url(#ecoArrow)"/>`}).join('');
    const nodes=ecoNodes.map(n=>`<button class="eco-node ${state.selected===n.id?'selected':''} ${isSimulation?'locked':''}" data-eco-node="${n.id}" style="left:${n.x}%;top:${n.y}%" ${isSimulation?'disabled':''}><span class="eco-node-icon">${n.icon}</span><strong>${n.name}</strong><small>${n.role}</small></button>`).join('');
    const progress=isSimulation?'6 / 6 RELAȚII':`${state.links.size} / ${ecoEdges.length} RELAȚII`; 
    return `<section class="mini-game-intro"><div class="mini-kicker">BIOLOGIE · MODEL DE PAJIȘTE</div><h1 id="lumenGameTitle">Rețeaua vie</h1><p>Leagă fiecare hrană de consumatorul potrivit. Apoi schimbă resursele și urmărește cum reacționează modelul.</p><div class="mini-stage-count"><span>ETAPA ${isSimulation?'02':'01'} / 02</span><b>${progress}</b></div></section><div class="mini-game-layout eco-layout"><section class="eco-board-wrap"><div class="eco-board-heading"><div><small>REȚEA TROFICĂ · EXEMPLU SIMPLIFICAT</small><strong>${isSimulation?'Relațiile tale sunt active':'Atinge sursa de hrană, apoi organismul care o consumă'}</strong></div><button class="mini-reset" data-game-action="restart-eco">↺ Reia</button></div><div class="eco-board"><svg class="eco-lines" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="ecoArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L0,8 L9,4 z" fill="#b8a3ff"/></marker></defs>${lines}</svg>${nodes}</div><div class="eco-footnote"><span>☀</span> Energia se transferă de la hrană la consumator. Descompunătorii contribuie la reciclarea materiei.</div></section><aside class="mini-game-side"><div class="mini-side-label">JURNAL DE TEREN</div><div class="eco-feedback ${state.message.startsWith('Relație')?'good':''}" id="ecoFeedback">${esc(state.message)}</div>${isSimulation?`<div class="eco-sim-panel"><div class="eco-sim-title"><span>SIMULATOR DE RESURSE</span><b id="ecoPlantValue">${state.simValue}%</b></div><p>Redu disponibilitatea plantelor și observă răspunsul relativ al populațiilor în acest model demonstrativ.</p><label class="eco-range-label" for="ecoPlantRange">PLANTE DISPONIBILE</label><input id="ecoPlantRange" type="range" min="20" max="100" step="10" value="${state.simValue}"><div class="eco-population-list">${[['Plante','ecoPlants'],['Lăcuste','ecoHopper'],['Iepuri','ecoRabbit'],['Broaște','ecoFrog'],['Vulpi','ecoFox']].map(([name,id])=>`<div class="eco-population"><span>${name}</span><div><i id="${id}" style="width:100%"></i></div></div>`).join('')}</div><small class="eco-model-note">Model didactic simplificat; barele arată o relație ilustrativă, nu o predicție pentru o populație reală.</small><button class="mini-primary full" id="ecoFinish" data-game-action="finish-eco" ${state.simChanged?'':'disabled'}>Încheie investigația</button></div>`:`<div class="eco-lesson-card"><small>CONCEPTUL CHEIE</small><strong>Producător → consumator → descompunător</strong><p>O rețea trofică unește mai multe lanțuri. Săgeata arată transferul, iar materia este reciclată prin descompunere.</p></div><div class="eco-progress"><span style="width:${Math.round(state.links.size/ecoEdges.length*100)}%"></span></div><div class="eco-progress-label"><span>Legături corecte</span><b>${state.links.size} / ${ecoEdges.length}</b></div>`}</aside></div>`;
  }
  function chooseEco(id){
    if(state.phase!==1)return;
    if(!state.selected){state.selected=id;state.message=`Ai ales ${ecoNodes.find(n=>n.id===id)?.name}. Acum atinge organismul care se hrănește cu el.`;render();return}
    if(state.selected===id){state.selected=null;state.message='Selecția a fost anulată. Alege o sursă de hrană.';render();return}
    const edge=ecoEdges.find(x=>x.from===state.selected&&x.to===id);
    if(edge){state.links.add(edge.id);state.message=`Relație conectată · ${edge.explain}`;state.selected=null;if(state.links.size===ecoEdges.length){state.phase=2;state.message='Rețeaua este completă. Acum poți urmări în model ce se întâmplă când disponibilitatea producătorilor se schimbă.'}render()}
    else{const from=ecoNodes.find(n=>n.id===state.selected)?.name,to=ecoNodes.find(n=>n.id===id)?.name;state.selected=null;state.message=`În această rețea simplificată, relația ${from} → ${to} nu este înregistrată. Verifică rolurile din jurnal și încearcă altă legătură.`;render()}
  }
  function updateEcoSimulation(value){
    state.simValue=value;state.simChanged=value<100;$('#ecoPlantValue').textContent=`${value}%`;
    const values={ecoPlants:value,ecoHopper:Math.round(value*.72),ecoRabbit:Math.round(value*.6),ecoFrog:Math.round(value*.72*.68),ecoFox:Math.round((value*.6+value*.72*.68)*.5)};
    for(const [id,n] of Object.entries(values)){const bar=$(`#${id}`);if(bar)bar.style.width=`${n}%`}
    const finish=$('#ecoFinish');if(finish)finish.disabled=!state.simChanged;
    const feed=$('#ecoFeedback');if(feed)feed.textContent=value===100?'Modelul pornește cu resursele la nivel de referință. Deplasează glisorul pentru a explora o schimbare.':`Resurse vegetale: ${value}%. În model, efectul se propagă întâi spre consumatorii primari, apoi spre consumatorii care depind de ei.`;
  }
  function renderMath(){
    if(state.done)return `<section class="mini-finish"><div class="mini-finish-icon">＝</div><small>ATELIER ÎNCHEIAT · MATEMATICĂ</small><h1 id="lumenGameTitle">Echilibrul s-a păstrat.</h1><p>Ai rezolvat trei ecuații aplicând operații inverse pe ambii membri. Fiecare transformare a menținut egalitatea.</p><div class="mini-finish-actions"><button class="mini-primary" data-game-action="restart-math">Reia atelierul</button><button class="mini-secondary" data-mini-action="close">Înapoi la jocuri</button></div></section>`;
    const c=mathLevels[state.level],stepsDone=state.step,solved=state.solved,current=solved?{left:c.resultLeft,right:c.resultRight}:stepsDone===0?{left:c.left,right:c.right}:{left:c.steps[stepsDone-1].afterLeft,right:c.steps[stepsDone-1].afterRight},opts=c.options.map(([id,label])=>`<button class="math-op ${solved?'muted':''}" data-math-op="${id}" ${solved?'disabled':''}><span>${label.split(' ')[0]}</span><b>${label}</b><small>pe ambii membri</small></button>`).join('');
    const history=c.steps.map((s,i)=>`<div class="math-history-row ${i<stepsDone?'done':''}"><span>${i<stepsDone?'✓':String(i+1).padStart(2,'0')}</span><div><b>${s.label}</b><small>${i<stepsDone?s.why:'Așteaptă transformarea'}</small></div></div>`).join('');
    return `<section class="mini-game-intro"><div class="mini-kicker">MATEMATICĂ · BALANȚA EGALITĂȚII</div><h1 id="lumenGameTitle">Balanța necunoscutei</h1><p>Nu alegi un răspuns dintr-o listă: aplici operații pe ambele părți și urmărești ecuația cum se transformă.</p><div class="mini-stage-count"><span>NIVEL ${state.level+1} / ${mathLevels.length} · ${esc(c.title)}</span><b>${solved?'TRANSFORMARE CORECTĂ':`PAS ${Math.min(stepsDone+1,c.steps.length)} / ${c.steps.length}`}</b></div></section><div class="mini-game-layout math-layout"><section class="math-workbench"><div class="math-story"><span>✧</span><p>${esc(c.story)}</p><button class="mini-reset" data-game-action="restart-level">↺ Reia nivelul</button></div><div class="math-equation-card ${solved?'solved':''}"><div class="math-equation-label">ECUAȚIA CURENTĂ</div><div class="math-equation"><div class="math-side left-side"><small>MEMBRUL STÂNG</small><strong>${esc(current.left)}</strong></div><span class="math-equals">＝</span><div class="math-side right-side"><small>MEMBRUL DREPT</small><strong>${esc(current.right)}</strong></div></div><div class="math-beam"><i></i></div><div class="math-fulcrum"></div><div class="math-balance-status">${solved?'✓ EGALITATE PĂSTRATĂ':'⚖ Echilibrul se păstrează dacă aplici aceeași operație ambelor părți'}</div></div><div class="math-operation-title"><span>ALEGE O OPERAȚIE</span><small>${stepsDone} / ${c.steps.length} transformări</small></div><div class="math-operations">${opts}</div><div class="math-feedback ${solved?'good':''}" id="mathFeedback">${esc(state.message)}</div>${solved?`<div class="math-result"><span>VALOAREA NECUNOSCUTEI</span><b>x = ${esc(c.resultRight)}</b><small>Verifică în ecuația inițială înainte de a trece mai departe.</small><button class="mini-primary" data-game-action="next-math">${state.level===mathLevels.length-1?'Finalizează atelierul':'Deschide nivelul următor →'}</button></div>`:''}</section><aside class="mini-game-side math-side"><div class="mini-side-label">URMEAZĂ TRANSFORMĂRILE</div><div class="math-history">${history}</div><div class="math-rule"><small>REGULA ATELIERULUI</small><b>Ce faci într-un membru, faci și în celălalt.</b><p>Operațiile inverse anulează operațiile aplicate necunoscutei.</p></div></aside></div>`;
  }
  function applyMath(id){
    if(state.solved)return;const c=mathLevels[state.level],expected=c.steps[state.step];if(id!==expected.id){state.message=c.hint;const feed=$('#mathFeedback');if(feed){feed.textContent=state.message;feed.classList.remove('shake');void feed.offsetWidth;feed.classList.add('shake')}return}
    state.step++;state.solved=state.step===c.steps.length;state.message=expected.why;render();
  }
  function gameAction(action){
    if(action==='restart-eco'){state={id:'ecosystem',phase:1,links:new Set(),selected:null,message:'Alege organismul de la care pornește relația, apoi ceea ce se hrănește cu el.',simValue:100,simChanged:false,done:false};render();return}
    if(action==='finish-eco'&&state.phase===2&&state.simChanged){state.done=true;render();return}
    if(action==='restart-math'){state={id:'equation',level:0,step:0,solved:false,done:false,message:'Alege piesa operațională care păstrează echilibrul.'};render();return}
    if(action==='restart-level'){state.step=0;state.solved=false;state.message='Alege operația inversă și păstrează egalitatea.';render();return}
    if(action==='next-math'&&state.solved){if(state.level+1>=mathLevels.length)state.done=true;else{state.level++;state.step=0;state.solved=false;state.message='Alege piesa operațională care păstrează echilibrul.'}render()}
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-game-open]');if(b)open(b.dataset.gameOpen)});
  window.startLumenMiniGame=open;
})();
