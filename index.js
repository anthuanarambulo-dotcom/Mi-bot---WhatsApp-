const{default:m,useMultiFileAuthState:u,DisconnectReason:D}=require('@whiskeysockets/baileys');
async function start(){
const{state,saveCreds}=await u('auth');
const s=m({auth:state,printQRInTerminal:false});
s.ev.on('creds.update',saveCreds);
if(!state.creds.registered){await new Promise(r=>setTimeout(r,3000));const c=await s.requestPairingCode('51997210505');console.log('\n\nTU CODIGO: '+c+'\n\n');}
s.ev.on('connection.update',({connection,lastDisconnect})=>{if(connection==='open')console.log('Conectado!');if(connection==='close'&&lastDisconnect?.error?.output?.statusCode!==D.loggedOut)start();});
s.ev.on('messages.upsert',async({messages})=>{const msg=messages[0];if(!msg.message||msg.key.fromMe)return;const t=msg.message?.conversation?.toLowerCase()||'';const f=msg.key.remoteJid;const r=async x=>await s.sendMessage(f,{text:x},{quoted:msg});if(t==='!hola')await r('Hola!');else if(t==='!ping')await r('Pong!');else if(t==='!dado')await r('Salio: '+(Math.floor(Math.random()*6)+1));});
}
start();
