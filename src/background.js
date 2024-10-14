chrome.runtime.onMessage.addListener(
  (message, sender) => {
    if (message.type === 'badge.update') {
      if (message.number === 0) {
        chrome.action.setBadgeText({
          text: ''
        });
      } else {
        chrome.action.setBadgeText({
          text: `${parseInt(message.number)}`,
        });
        chrome.action.setBadgeTextColor({color: '#fff'});
        chrome.action.setBadgeBackgroundColor({
          color: '#06f'
        })
      }
    }
  }
)