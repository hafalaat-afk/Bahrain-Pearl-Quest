/* Bahrain Pearl Quest — real-time host + guest rooms on Firebase Realtime Database.
   Solo play remains in index.html and needs no service or internet connection. */
'use strict';
const GROUP_SECONDS=14, REVIEW_SECONDS=3, CODE_CHARS='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const MP_TEXT={
 en:{select:'CHOOSE YOUR ADVENTURE',heading:'One sea. Two ways to dive.',description:'Enjoy a personal pearl dive, or join a live celebration where everyone plays together.',solo:'Individual play',soloHelp:'Play independently, open your own oysters and see your final score.',group:'Live group play',groupHelp:'One host, one QR code, synchronized questions and a shared leaderboard.',host:'Host a new game',join:'Join a game',enterCode:'ROOM CODE',enterName:'YOUR USERNAME',enterNameHint:'Guests enter a name after scanning the QR code.',joinNow:'Join the crew',create:'Create live room',back:'Back',notConfigured:'Live multiplayer needs a one-time Firebase setup. See SETUP_LIVE.md in the download. Individual play works now.',setup:'Firebase connection is not configured',connecting:'Connecting to the live room…',room:'ROOM CODE',copy:'Copy guest link',copied:'Copied!',scan:'Scan to join',share:'Display this screen on a projector or large monitor. Guests scan the QR code, enter a username and wait for you to start.',players:'Divers in the room',none:'No guests yet. Keep this screen open while guests arrive.',start:'START GAME FOR EVERYONE',wait:'Waiting for the host',waitText:'You are in the crew! When the host presses Start, the first oyster opens automatically on your phone.',you:'You',round:'Oyster',live:'LIVE CHALLENGE',ends:'SECONDS LEFT',answered:'Answer sent. Awaiting the next pearl…',submitted:'Answered',correct:'That pearl is yours!',wrong:'The pearl slipped away',timeout:'Time ran out',fact:'DID YOU KNOW?',answer:'Correct answer:',review:'REVEALING THE PEARL',next:'Next oyster opens automatically…',leaderboard:'Live leaderboard',yourRank:'Your position',winner:'THE FINAL TREASURE',completed:'All 16 oysters have been opened!',results:'Individual results',finish:'Final scores',pts:'points',pearl:'pearls',return:'Return to game menu',copyResult:'Copy my result',reconnect:'Reconnecting…',hostNote:'Keep this host tab open throughout the game. Closing it pauses the question progression until you reopen it.',started:'The dive has begun. New participants cannot join.',roomMissing:'This room was not found. Check the code with your host.',duplicate:'That username is already taken. Please enter another name.',startMin:'At least one guest must join before starting.',error:'Connection error',dismiss:'Dismiss',yourCorrect:'Correct answers',totalScore:'Total score',rank:'Rank',ready:'Get ready for the next oyster!',linkWarn:'Publish this site to GitHub Pages before showing this QR code. A local file link will not work on guests’ phones.',endTime:'4–5 minutes · 16 oysters · 14 seconds each',noAuth:'Could not connect. Enable Anonymous sign-in, create Realtime Database, and apply the database.rules.json file in Firebase.',soloLabel:'No setup needed',groupLabel:'Firebase setup required once',hostView:'HOST CONTROL ROOM',onlyHost:'Only the host can start or advance this live game.',resultWait:'Waiting for the final leaderboard…'},
 ar:{select:'اختر مغامرتك',heading:'بحر واحد... وطريقتان للغوص.',description:'العب بمفردك أو انضم إلى منافسة مباشرة يشارك فيها الجميع معًا.',solo:'اللعب الفردي',soloHelp:'افتح المحار بنفسك وأجب عن الأسئلة وشاهد نتيجتك النهائية.',group:'اللعب الجماعي المباشر',groupHelp:'مضيف واحد، رمز QR واحد، أسئلة متزامنة وترتيب مشترك.',host:'استضافة لعبة جديدة',join:'الانضمام إلى لعبة',enterCode:'رمز الغرفة',enterName:'اسم اللاعب',enterNameHint:'يكتب الضيوف أسمائهم بعد مسح رمز QR.',joinNow:'انضم إلى الغواصين',create:'إنشاء غرفة مباشرة',back:'رجوع',notConfigured:'يتطلب اللعب الجماعي إعداد Firebase لمرة واحدة. راجع ملف SETUP_LIVE.md. اللعب الفردي يعمل الآن.',setup:'لم يكتمل إعداد الاتصال الجماعي',connecting:'جاري الاتصال بالغرفة…',room:'رمز الغرفة',copy:'نسخ رابط الضيوف',copied:'تم النسخ!',scan:'امسح للانضمام',share:'اعرض هذه الشاشة على شاشة كبيرة. يمسح الضيوف رمز QR ثم يكتبون أسماءهم وينتظرون بدء اللعبة.',players:'الغواصون في الغرفة',none:'لم ينضم أي ضيوف بعد. أبقِ هذه الصفحة مفتوحة.',start:'ابدأ اللعبة للجميع',wait:'بانتظار المضيف',waitText:'أنت ضمن فريق الغواصين! عندما يضغط المضيف زر البدء ستفتح المحارة الأولى تلقائيًا على هاتفك.',you:'أنت',round:'المحارة',live:'التحدي المباشر',ends:'الوقت المتبقي',answered:'تم إرسال الإجابة. انتظر المحارة التالية…',submitted:'أجاب',correct:'لقد ربحت لؤلؤة!',wrong:'لم تحصل على اللؤلؤة',timeout:'انتهى الوقت',fact:'هل تعلم؟',answer:'الإجابة الصحيحة:',review:'الكشف عن اللؤلؤة',next:'ستفتح المحارة التالية تلقائيًا…',leaderboard:'لوحة الترتيب المباشرة',yourRank:'ترتيبك',winner:'الكنز النهائي',completed:'تم فتح المحارات الست عشرة!',results:'نتيجتك الفردية',finish:'النتائج النهائية',pts:'نقطة',pearl:'لؤلؤة',return:'العودة إلى القائمة',copyResult:'نسخ نتيجتي',reconnect:'جاري إعادة الاتصال…',hostNote:'أبقِ صفحة المضيف مفتوحة طوال اللعبة. يؤدي إغلاقها إلى توقف تقدم الأسئلة مؤقتًا حتى تعيد فتحها.',started:'بدأت اللعبة، ولا يمكن للاعبين الجدد الانضمام.',roomMissing:'لم يتم العثور على الغرفة. تحقق من الرمز.',duplicate:'الاسم مستخدم من قبل. اختر اسمًا آخر.',startMin:'يجب انضمام ضيف واحد على الأقل للبدء.',error:'خطأ في الاتصال',dismiss:'إغلاق',yourCorrect:'الإجابات الصحيحة',totalScore:'مجموع النقاط',rank:'الترتيب',ready:'استعد للمحارة التالية!',linkWarn:'انشر الموقع عبر GitHub Pages أولًا، فرابط الملف المحلي لا يعمل على هواتف الضيوف.',endTime:'٤–٥ دقائق · ١٦ محارة · ١٤ ثانية لكل سؤال',noAuth:'تعذر الاتصال. فعّل تسجيل الدخول المجهول وأنشئ قاعدة بيانات Firebase وطبّق قواعد الأمان المرفقة.',soloLabel:'لا يحتاج إلى إعداد',groupLabel:'يحتاج إلى إعداد Firebase مرة واحدة',hostView:'لوحة تحكم المضيف',onlyHost:'المضيف وحده يستطيع بدء اللعبة والتحكم في تقدمها.',resultWait:'بانتظار لوحة النتائج النهائية…'}
};
const mt=k=>MP_TEXT[lang][k]||k;
let mpRole='',mpCode='',mpRoom=null,mpRoomRef=null,mpRoomListener=null,mpUID='',mpServerOffset=0,mpInitPromise=null,mpDb=null,mpAuth=null,mpBusy=false,mpError='',mpAdvanceBusy=false,mpLastRound=-1,mpRenderedRound=-1;
const mpConfigured=()=>{let c=window.PEARL_FIREBASE_CONFIG;return !!(c && c.apiKey && c.databaseURL && !String(c.apiKey).startsWith('YOUR_'))};
const mpNow=()=>Date.now()+mpServerOffset;
function multiplayerIsMode(){return phase.startsWith('multi')}
function mpSet(s){phase='multi'+s;render()}
function mpBack(){if(mpRoomRef&&mpRoomListener)mpRoomRef.off('value',mpRoomListener);mpRoomRef=null;mpRoomListener=null;mpRoom=null;mpRole='';mpCode='';mpError='';clearTimers();try{history.replaceState({},'',location.pathname)}catch(e){}mpSet('Home')}
function mpShowError(message){mpError=String(message||mt('error')).replace(/^Error:\s*/, '');mpBusy=false;render()}
function mpErrHtml(){return mpError?`<div class="mp-alert" role="alert">⚠️ ${esc(mpError)}</div>`:''}
function mpAction(label,onclick,id='',klass='primary'){return `<button type="button" class="${klass}" id="${id}">${label}</button>`}
function mpInstallHandlers(bindings){for(const [id,fn] of bindings){const el=$(id);if(el)el.addEventListener('click',fn)}}
function mpLoadScript(url){return new Promise((resolve,reject)=>{let tag=document.createElement('script');tag.src=url;tag.async=true;tag.onload=resolve;tag.onerror=()=>reject(Error('Could not load Firebase. Check your internet connection.'));document.head.appendChild(tag)})}
async function mpInit(){if(!mpConfigured())throw Error(mt('notConfigured'));if(mpInitPromise)return mpInitPromise;
 mpInitPromise=(async()=>{
  const ver='10.14.1',base='https://www.gstatic.com/firebasejs/'+ver+'/';
  await mpLoadScript(base+'firebase-app-compat.js');await mpLoadScript(base+'firebase-auth-compat.js');await mpLoadScript(base+'firebase-database-compat.js');
  if(!firebase.apps.length)firebase.initializeApp(window.PEARL_FIREBASE_CONFIG);
  mpDb=firebase.database();mpAuth=firebase.auth();
  await mpAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  if(!mpAuth.currentUser)await mpAuth.signInAnonymously();mpUID=mpAuth.currentUser.uid;
  mpDb.ref('.info/serverTimeOffset').on('value',s=>mpServerOffset=Number(s.val())||0);
 })();try{await mpInitPromise}catch(e){mpInitPromise=null;throw e}}
function mpRandomCode(){let a=new Uint8Array(6);crypto.getRandomValues(a);return Array.from(a,n=>CODE_CHARS[n%CODE_CHARS.length]).join('')}
function mpGuestLink(){const u=new URL(location.href);u.search='';u.hash='';u.searchParams.set('room',mpCode);return u.href}
function mpQR(){const node=$('mpQr');if(!node||!window.PearlQR)return;try{window.PearlQR(node,mpGuestLink())}catch(e){node.insertAdjacentHTML('afterend',`<div class="tiny">${esc(mpGuestLink())}</div>`)}}
function mpListen(){mpRoomListener=s=>{
 const value=s.val();if(!value){mpShowError(mt('roomMissing'));return}
 const prev=mpLastRound;mpRoom=value;index=Math.min(questionBank.length-1,Number(value.round)||0);
 const ranks=mpRanks(value);let self=ranks.find(x=>x.uid===mpUID);pearls=self?.correct||0;correct=self?.correct||0;score=self?.score||0;
 const next='multi'+(value.phase==='lobby'?(mpRole==='host'?'HostLobby':'GuestLobby'):value.phase==='question'?'Playing':value.phase==='feedback'?'Review':'Finished');
 const newRound=prev!==index && value.phase==='question';mpLastRound=index;phase=next;
 render();if(newRound){playTone(500,.14);$('clamButton').classList.remove('open');const openingRound=index;setTimeout(()=>{if(phase==='multiPlaying'&&index===openingRound)$('clamButton').classList.add('open')},Math.max(400,Number(value.startsAt)-mpNow()+350));if(mpRole==='guest'&&window.matchMedia('(max-width: 820px)').matches)$('side').scrollIntoView({behavior:'smooth',block:'start'});}
 };mpRoomRef.on('value',mpRoomListener,e=>mpShowError(e.message))}
async function mpCreate(){if(mpBusy)return;mpBusy=true;mpError='';mpSet('Connecting');
 try{await mpInit();let result=null;
   for(let k=0;k<5;k++){const code=mpRandomCode(),ref=mpDb.ref('rooms/'+code);const data={hostUid:mpUID,phase:'lobby',round:'0',createdAt:firebase.database.ServerValue.TIMESTAMP,startsAt:0,endsAt:0,feedbackUntil:0};
      result=await ref.transaction(x=>x===null?data:undefined,undefined,false);
      if(result.committed){mpCode=code;mpRole='host';mpRoomRef=ref;break}}
   if(!mpRoomRef)throw Error('Could not allocate a unique room code.');
   mpLastRound=-1;try{history.replaceState({},'',location.pathname+'?host='+encodeURIComponent(mpCode))}catch(e){}localStorage.setItem('bahrainPearlHostRoom',mpCode);mpListen();mpBusy=false;
 }catch(e){mpRole='';mpShowError(e.message||mt('noAuth'));mpSet('Home')}}
async function mpJoin(){if(mpBusy)return;const code=String($('mpCode')?.value||mpCode).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6),uname=String($('mpName')?.value||'').trim().replace(/\s+/g,' ').slice(0,24);
 if(code.length!==6){mpShowError('Enter the 6-character room code.');return}
 if(uname.length<2){mpShowError(lang==='ar'?'أدخل اسمًا من حرفين على الأقل.':'Please enter a username of at least 2 characters.');return}
 mpBusy=true;mpError='';mpCode=code;name=uname;mpSet('Connecting');
 try{await mpInit();const ref=mpDb.ref('rooms/'+code),snap=await ref.once('value');if(!snap.exists())throw Error(mt('roomMissing'));
 const room=snap.val(),me=room.players?.[mpUID];if(room.phase!=='lobby'&&!me)throw Error(mt('started'));
 const duplicate=Object.entries(room.players||{}).some(([uid,p])=>uid!==mpUID&&String(p.name).toLowerCase()===uname.toLowerCase());if(duplicate)throw Error(mt('duplicate'));
 if(!me){await ref.child('players/'+mpUID).set({name:uname,joinedAt:firebase.database.ServerValue.TIMESTAMP})}
 mpRole='guest';mpRoomRef=ref;mpLastRound=-1;try{history.replaceState({},'',location.pathname+'?room='+encodeURIComponent(code))}catch(e){}mpListen();mpBusy=false;
 }catch(e){mpRole='';mpBusy=false;mpError=e.message||mt('noAuth');mpSet('Join')}}
async function mpResumeHost(code){mpBusy=true;mpError='';mpSet('Connecting');try{await mpInit();const ref=mpDb.ref('rooms/'+code),snap=await ref.once('value');if(!snap.exists())throw Error(mt('roomMissing'));if(snap.val().hostUid!==mpUID)throw Error('This browser is not the original room host. Use the browser that created the game.');mpCode=code;mpRole='host';mpRoomRef=ref;mpLastRound=-1;mpListen();mpBusy=false;}catch(e){mpRole='';mpShowError(e.message||mt('noAuth'));mpSet('Home')}}
function mpStart(){if(mpRole!=='host'||!mpRoomRef||mpRoom?.phase!=='lobby')return;
 if(!Object.keys(mpRoom.players||{}).length){mpShowError(mt('startMin'));return}
 const start=mpNow()+1100,end=start+GROUP_SECONDS*1000;
 mpRoomRef.update({phase:'question',round:'0',startsAt:start,endsAt:end,'rounds/0':{startsAt:start,endsAt:end}}).catch(e=>mpShowError(e.message));}
async function mpSubmit(choice){if(mpRole!=='guest'||mpRoom?.phase!=='question'||mpNow()>Number(mpRoom.endsAt))return;
 if(mpRoom.answers?.[String(index)]?.[mpUID])return;
 const b=document.querySelectorAll('[data-mp-answer]');b.forEach(btn=>btn.disabled=true);
 try{await mpRoomRef.child(`answers/${index}/${mpUID}`).set({choice,submittedAt:firebase.database.ServerValue.TIMESTAMP})}
 catch(e){mpShowError(e.message)} }
function mpAdvance(){if(mpRole!=='host'||mpAdvanceBusy||!mpRoomRef||!mpRoom)return;
 const room=mpRoom;let upd=null;
 if(room.phase==='question'&&mpNow()>=Number(room.endsAt)+150){upd={phase:'feedback',feedbackUntil:mpNow()+REVIEW_SECONDS*1000}}
 else if(room.phase==='feedback'&&mpNow()>=Number(room.feedbackUntil)+120){const next=Number(room.round)+1;
   if(next>=questionBank.length)upd={phase:'done',finishedAt:firebase.database.ServerValue.TIMESTAMP};
   else {const start=mpNow()+850;upd={phase:'question',round:String(next),startsAt:start,endsAt:start+GROUP_SECONDS*1000,[`rounds/${next}`]:{startsAt:start,endsAt:start+GROUP_SECONDS*1000}}}}
 if(!upd)return;mpAdvanceBusy=true;mpRoomRef.update(upd).catch(e=>mpShowError(e.message)).finally(()=>mpAdvanceBusy=false)}
function mpRanks(room){const players=room?.players||{};return Object.entries(players).map(([uid,p])=>{
 let points=0,pearls=0,answered=0;
 for(let i=0;i<questionBank.length;i++){const ans=room.answers?.[i]?.[uid],round=room.rounds?.[i];if(!ans||!round)continue;
 const when=Number(ans.submittedAt),start=Number(round.startsAt),end=Number(round.endsAt);
 if(!Number.isFinite(when)||when<start-2000||when>end)continue;answered++;
 if(Number(ans.choice)===questionBank[i].answer){pearls++;points+=100+Math.max(0,Math.ceil((end-when)/1000))*3}}
 return {uid,name:String(p.name||'Diver').slice(0,24),score:points,correct:pearls,answered};
 }).sort((a,b)=>b.score-a.score||b.correct-a.correct||a.name.localeCompare(b.name));}
function mpBoard(ranks,limit=0){const listed=limit?ranks.slice(0,limit):ranks;return `<div class="mp-board">${listed.length?listed.map((p,i)=>`<div class="mp-board-row${p.uid===mpUID?' mp-me':''}"><span class="mp-rank">${i===0?'🥇':i===1?'🥈':i===2?'🥉':localized(i+1)}</span><span class="mp-player">${esc(p.name)} ${p.uid===mpUID?`<small>(${mt('you')})</small>`:''}</span><strong>${localized(p.score)}</strong><span class="mp-small">🤍 ${localized(p.correct)}</span></div>`).join(''):`<div class="tiny">${mt('none')}</div>`}</div>`}
function mpPlayerChips(players){return `<div class="mp-players">${Object.values(players||{}).map(p=>`<span class="mp-player-chip">🤍 ${esc(p.name)}</span>`).join('')||`<p class="tiny">${mt('none')}</p>`}</div>`}
function mpTop(k){return `<div class="eyebrow">🇧🇭 ${mt(k)}</div>`}
function mpRenderQuestion(){const q=questionBank[index],r=mpRoom,ans=r.answers?.[index]?.[mpUID],isHost=mpRole==='host',remaining=Math.max(0,Math.ceil((Number(r.endsAt)-mpNow())/1000));
 const timer=`<div class="timer" id="mTimerGraphic"><span id="mSeconds">${localized(remaining)}</span></div>`;
 return `<div class="progress-head"><span>${t().chapter[q.chapter]} · ${mt('live')}</span><span>${localized(index+1)} / ${localized(questionBank.length)}</span></div><div class="track"><div style="width:${(index+1)/questionBank.length*100}%"></div></div><div class="question-top"><span class="question-tag">🦪 ${mt('round')} ${localized(index+1)}</span>${timer}</div><div class="artframe">${svgArt(q.art)}</div><div class="question-text">${esc(qtext(q))}</div>
 <div class="options">${opts(q).map((option,i)=>`<button class="opt" data-mp-answer="${i}" ${isHost||ans||remaining<=0?'disabled':''}><span class="letter">${'ABCD'[i]}</span>${esc(option)}</button>`).join('')}</div>
 <div class="mp-note">${isHost?`<strong id="mAnswerCount">${Object.keys(r.answers?.[index]||{}).length}/${Object.keys(r.players||{}).length}</strong> ${mt('submitted')} · ${mt('onlyHost')}`:ans?`✓ ${mt('answered')}`:`⏱ ${mt('ends')}: ${localized(remaining)}`}</div>`}
function mpRenderReview(){const r=mpRoom,q=questionBank[index],ans=r.answers?.[index]?.[mpUID],good=ans&&Number(ans.choice)===q.answer,timeout=!ans;
 return `<div class="eyebrow">🦪 ${mt('review')} ${localized(index+1)}/${localized(questionBank.length)}</div><div class="artframe" style="margin-top:15px">${svgArt(q.art)}</div><div class="feedback-sym">${mpRole==='host'?'🤍':good?'🤍':timeout?'⌛':'🐚'}</div><h2 class="feedback-head ${good?'feedback-correct':'feedback-wrong'}">${mpRole==='host'?mt('fact'):good?mt('correct'):timeout?mt('timeout'):mt('wrong')}</h2><div class="info-card"><strong>${mt('answer')}</strong><div>${esc(opts(q)[q.answer])}</div><br><strong>${mt('fact')}</strong><div>${esc(fact(q))}</div></div><div class="mp-mini-title">${mt('leaderboard')}</div>${mpBoard(mpRanks(r),5)}<div class="tiny" style="text-align:center">${mt('next')}</div>`}
function mpRenderFinish(){const ranking=mpRanks(mpRoom),me=ranking.find(x=>x.uid===mpUID),host=mpRole==='host',myRank=ranking.findIndex(x=>x.uid===mpUID)+1;
 return `${mpTop('winner')}<h1 class="title" style="font-size:34px">${mt('completed')}</h1>${host?`<div class="result-badge">🏆</div><div class="mp-mini-title">${mt('finish')}</div>`:`<div class="result-badge">🤍</div><div class="result-score">${localized(me?.score||0)}</div><div class="result-label">${mt('totalScore')}</div><div class="stat-grid"><div class="stat"><b>${localized(myRank)}</b><small>${mt('rank')}</small></div><div class="stat"><b>${localized(me?.correct||0)}/${localized(questionBank.length)}</b><small>${mt('yourCorrect')}</small></div></div><div class="mp-mini-title">${mt('leaderboard')}</div>`}${mpBoard(ranking)}<div class="mp-buttons"><button class="secondary" id="mpBack">${mt('return')}</button>${!host?`<button class="primary" id="mpCopyResult">${mt('copyResult')}</button>`:''}</div>`}
function multiplayerRender(){const l=t();updateHud();$('clamButton').disabled=true;$('clamHint').classList.add('hide');$('diver').classList.toggle('dive-down',phase==='multiPlaying'||phase==='multiReview');$('clamButton').classList.toggle('open',(phase==='multiPlaying'&&mpNow()>Number(mpRoom?.startsAt||0)+350)||phase==='multiReview'||phase==='multiFinished');
 let html='';
 if(phase==='multiHome')html=`${mpTop('select')}<h1 class="title" style="font-size:clamp(30px,3vw,43px)">${mt('heading')}</h1><p class="lead">${mt('description')}</p><div class="mp-choice"><button class="mp-mode-card" id="mpSolo"><span class="mp-mode-emoji">🦪</span><strong>${mt('solo')}</strong><small>${mt('soloHelp')}</small><em>${mt('soloLabel')}</em></button><div class="mp-mode-card mp-nonclick"><span class="mp-mode-emoji">🌊</span><strong>${mt('group')}</strong><small>${mt('groupHelp')}</small><em>${mt('groupLabel')}</em><div class="mp-buttons"><button class="primary" id="mpHost">${mt('host')}</button><button class="secondary" id="mpJoin">${mt('join')}</button></div></div></div>${mpErrHtml()}`;
 if(phase==='multiJoin')html=`${mpTop('join')}<h1 class="title" style="font-size:36px">${mt('join')}</h1><p class="lead">${mt('enterNameHint')}</p><label for="mpCode" class="field-label">${mt('enterCode')}</label><input id="mpCode" class="name-input mp-uppercase" maxlength="6" value="${esc(mpCode)}" autocomplete="off" placeholder="ABC234"/><label for="mpName" class="field-label">${mt('enterName')}</label><input id="mpName" class="name-input" maxlength="24" value="${esc(name)}" placeholder="${lang==='ar'?'اسمك':'Your name'}" autocomplete="nickname"/>${mpErrHtml()}<div class="mp-buttons"><button class="primary" id="mpJoinNow">${mt('joinNow')} 🤍</button><button class="secondary" id="mpBack">${mt('back')}</button></div>`;
 if(phase==='multiConnecting')html=`<div class="mp-wait-icon">🌊</div><div class="eyebrow">${mt('connecting')}</div><div class="mp-loading"></div>`;
 if(phase==='multiHostLobby'){const ps=mpRoom?.players||{};html=`${mpTop('hostView')}<h1 class="title" style="font-size:34px">${mt('scan')}</h1><div class="mp-code">${esc(mpCode)}</div><div class="mp-qr-wrap"><canvas id="mpQr" role="img" aria-label="Guest QR code"></canvas></div><p class="lead" style="font-size:13px;margin:10px 0">${mt('share')}</p>${location.protocol==='file:'?`<div class="mp-alert">${mt('linkWarn')}</div>`:''}<button class="secondary mp-copy-btn" id="mpCopy">${mt('copy')}</button><div class="mp-mini-title">${mt('players')} · ${localized(Object.keys(ps).length)}</div>${mpPlayerChips(ps)}${mpErrHtml()}<button id="mpStart" class="primary mp-full" ${Object.keys(ps).length===0?'disabled':''}>${mt('start')} ✨</button><p class="tiny">${mt('hostNote')}</p><button id="mpBack" class="mp-link">${mt('return')}</button>`}
 if(phase==='multiGuestLobby')html=`${mpTop('wait')}<div class="mp-wait-icon">🤿</div><h1 class="title" style="font-size:34px">${mt('wait')}</h1><p class="lead">${mt('waitText')}</p><div class="mp-code">${esc(mpCode)}</div><div class="mp-mini-title">${mt('players')} · ${localized(Object.keys(mpRoom?.players||{}).length)}</div>${mpPlayerChips(mpRoom?.players)}<button id="mpBack" class="secondary" style="margin-top:15px">${mt('return')}</button>`;
 if(phase==='multiPlaying')html=mpRenderQuestion();
 if(phase==='multiReview')html=mpRenderReview();
 if(phase==='multiFinished')html=mpRenderFinish();
 $('side').innerHTML=html;
 mpInstallHandlers([['mpSolo',()=>{phase='intro';render()}],['mpHost',mpCreate],['mpJoin',()=>{mpError='';mpSet('Join')}],['mpJoinNow',mpJoin],['mpBack',mpBack],['mpStart',mpStart],['mpCopy',mpCopyLink],['mpCopyResult',mpCopyResult]]);
 document.querySelectorAll('[data-mp-answer]').forEach(el=>el.addEventListener('click',()=>mpSubmit(Number(el.dataset.mpAnswer))));
 if(phase==='multiHostLobby')mpQR();
 const box=$('mpCode');if(box)box.addEventListener('input',e=>{mpCode=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6)});
}
async function mpClipboard(text){try{await navigator.clipboard.writeText(text)}catch(e){let box=document.createElement('textarea');box.value=text;document.body.appendChild(box);box.select();document.execCommand('copy');box.remove()}}
async function mpCopyLink(){await mpClipboard(mpGuestLink());if($('mpCopy'))$('mpCopy').textContent=mt('copied')}
async function mpCopyResult(){let me=mpRanks(mpRoom).find(p=>p.uid===mpUID),ranking=mpRanks(mpRoom);const msg=`🇧🇭 ${t().brand}\n${me?.name||name}\n${mt('totalScore')}: ${me?.score||0}\n${mt('yourCorrect')}: ${me?.correct||0}/${questionBank.length}\n${mt('rank')}: ${ranking.findIndex(p=>p.uid===mpUID)+1}`;await mpClipboard(msg);if($('mpCopyResult'))$('mpCopyResult').textContent=mt('copied')}
// Host is the timekeeper, but guests always derive the timer from Firebase server time.
setInterval(()=>{
 if(!multiplayerIsMode())return;
 if(mpRole==='host'&&mpRoom)mpAdvance();
 if(phase==='multiPlaying'&&mpRoom){const remain=Math.max(0,Math.ceil((Number(mpRoom.endsAt)-mpNow())/1000));let el=$('mSeconds');if(el)el.textContent=localized(remain);
 let ring=$('mTimerGraphic');if(ring){ring.style.background=`conic-gradient(${remain<=5?'#ff888f':'#f7d391'} ${Math.max(0,remain)/GROUP_SECONDS*100}%, #ffffff22 0)`;ring.classList.toggle('urgent',remain<=5)}}
},250);
// QR-link guests arrive directly at the username form.
const mpParams=new URLSearchParams(location.search),initialHost=mpParams.get('host'),initialCode=mpParams.get('room');
if(initialHost&&/^[A-Z0-9]{6}$/i.test(initialHost)){mpResumeHost(initialHost.toUpperCase())}
else if(initialCode&&/^[A-Z0-9]{6}$/i.test(initialCode)){mpCode=initialCode.toUpperCase();mpSet('Join')}else{mpSet('Home')}
