import { parseFriendQuery, storeAvailable, storeURL } from './link.mjs';
import { translations, languageFor } from './translations.mjs';

const language = languageFor(navigator.languages || [navigator.language]);
const copy = translations[language];
document.documentElement.lang = language;
document.title = copy.title + ' — The 14th Club';
document.querySelectorAll('[data-copy]').forEach(element => { element.textContent = copy[element.dataset.copy]; });
document.getElementById('store').href = storeURL;
document.getElementById('store').hidden = !storeAvailable;
document.getElementById('prelaunch').hidden = storeAvailable;

const friend = location.hash || location.href.length > 2048 ? null : parseFriendQuery(location.search);
if (friend) {
  const name = document.getElementById('name');
  name.textContent = friend.name;
  name.hidden = !friend.name;
  document.getElementById('code').textContent = friend.code;
  document.getElementById('open').href = friend.appURL;
  document.getElementById('friend').hidden = false;
  document.getElementById('copy').addEventListener('click', async () => {
    let message;
    try { await navigator.clipboard.writeText(friend.code); message = copy.copied; }
    catch { message = copy.copyFailed; }
    document.getElementById('copy-status').textContent = message;
  });
} else {
  document.querySelector('h1').textContent = copy.invalid;
  document.getElementById('intro').textContent = copy.invalidBody;
  document.getElementById('prelaunch').hidden = true;
}
