document.addEventListener('DOMContentLoaded', () => {
      const streamContent = document.getElementById('stream-content');

      if (!localStorage.getItem('isAuthenticated')) {
        window.location.href = '/login.html';
      } else {
        streamContent.style.display = 'block';
      }

      const videoPlayer = document.getElementById('stream');
      const connectBtn = document.getElementById('connectBtn');
      const apiKeyInput = document.getElementById('apiKey');
      const passcodeInput = document.getElementById('passcode');

      connectBtn.addEventListener('click', () => {
        const apiKey = apiKeyInput.value;
        const passcode = passcodeInput.value;
        const streamUrl = `YOUR_NANO_STREAMING_URL_HERE?apiKey=${apiKey}&passcode=${passcode}`;

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(videoPlayer);
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
          videoPlayer.src = streamUrl;
        } else {
          console.error('MPEG-Dash or HLS support is not available.');
        }
      });
    });
