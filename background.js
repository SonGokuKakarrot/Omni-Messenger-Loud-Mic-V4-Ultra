 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/background.js b/background.js
index a02d42df68b108d315ef9ab48f14f78e7b242756..dcf691d14666940df1356d3a19602b84d3fea879 100644
--- a/background.js
+++ b/background.js
@@ -1,38 +1,38 @@
-// Omni Messenger Lord background module.
+// Omni Messenger Lord V4 background module.
 // Local diagnostics only: no remote fetches, no webhooks, no token/session reads.
 
 const EXT = globalThis.browser ?? globalThis.chrome;
 const state = { installedAt: Date.now(), lastHeartbeat: 0, hookActiveTabs: new Set() };
 
 function reply(sendResponse, payload) {
   try { sendResponse(payload); } catch (_) {}
 }
 
 if (EXT?.runtime?.onInstalled) {
   EXT.runtime.onInstalled.addListener(() => {
-    console.log('[Omni Messenger Lord] installed');
+    console.log('[Omni Messenger Lord V4] installed');
   });
 }
 
 if (EXT?.runtime?.onMessage) {
   EXT.runtime.onMessage.addListener((message, sender, sendResponse) => {
     if (!message || typeof message !== 'object') return false;
 
     if (message.type === 'MICMAX_HEARTBEAT') {
       state.lastHeartbeat = Date.now();
       if (sender?.tab?.id != null) state.hookActiveTabs.add(sender.tab.id);
       reply(sendResponse, { ok: true });
       return false;
     }
 
     if (message.type === 'MICMAX_STATUS_REQUEST') {
       reply(sendResponse, {
         ok: true,
         installedAt: state.installedAt,
         lastHeartbeat: state.lastHeartbeat,
         activeTabs: [...state.hookActiveTabs]
       });
       return false;
     }
 
     if (message.type === 'MICMAX_RESET_STATUS') {
 
EOF
)
