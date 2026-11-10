window.buildGeneratedGame=function(subject,title,raw,concepts){
 const source=String(raw||''),fold=source.toLocaleLowerCase('ro');
 const order=(concepts||[]).filter(Boolean).sort((a,b)=>fold.indexOf(String(a).toLocaleLowerCase('ro'))-fold.indexOf(String(b).toLocaleLowerCase('ro'))).slice(0,4);
 const clauses=(source.match(/[^.!?]+[.!?]?/g)||[]).map(x=>x.trim()).filter(Boolean);
 const pairs=order.map(term=>[term,clauses.find(sentence=>sentence.toLocaleLowerCase('ro').includes(String(term).toLocaleLowerCase('ro')))||`Găsește „${term}” în materialul lecției.`]);
 const config={title,concepts:order,rawExcerpt:source.slice(0,250),rawLesson:source};
 if(subject==='Istorie')return {...config,type:'timeline',name:'Firul ideilor',goal:'Reordonează conceptele în succesiunea în care apar în material.',items:order,start:order.map((_,i)=>order.length-i-1),answer:order.map((_,i)=>i),hint:'Urmărește ordinea în care profesorul prezintă ideile în lecție.'};
 if(subject==='Chimie')return {...config,type:'sort',name:'Șirul conceptelor',goal:'Așază conceptele în ordinea prezentării din lecție.',items:order,start:order.map((_,i)=>order.length-i-1),answer:order.map((_,i)=>i),hint:'Folosește succesiunea din fragmentul furnizat de profesor.'};
 if(subject==='Limba română'||subject==='Biologie')return {...config,type:'match',name:'Potrivește ideea cu fragmentul',goal:'Conectează fiecare concept cu fragmentul lecției în care apare.',pairs};
 if(subject==='Engleză')return {...config,type:'memory',name:'Memory: termen și context',goal:'Găsește perechile concept–fragment din lecția furnizată.',pairs};
 return {...config,type:'conceptPath',name:'Traseul conceptelor',goal:'Activează conceptele în ordinea în care apar în lecția selectată.'};
};
