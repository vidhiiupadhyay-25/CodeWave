
    let htmlEditor, cssEditor, jsEditor;
let currentTab = 'html';
let darkMode = true;

window.onload = () => {
  htmlEditor = CodeMirror(document.getElementById('htmlEditor'), {
    mode: 'xml',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseTags: true
  });

  cssEditor = CodeMirror(document.getElementById('cssEditor'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true
  });

  jsEditor = CodeMirror(document.getElementById('jsEditor'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true
  });

  [htmlEditor, cssEditor, jsEditor].forEach(editor => {
    editor.on("change", updatePreview);
  });

  updatePreview();
};

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.editor').forEach(e => e.classList.remove('active'));

  document.querySelector(`.tab[onclick="switchTab('${tab}')"]`).classList.add('active');
  document.getElementById(`${tab}Editor`).classList.add('active');
  currentTab = tab;
}

function updatePreview() {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;
  const output = document.getElementById('output');
  output.srcdoc = `${html}${css}${js}`;
}

function toggleTheme() {
  darkMode = !darkMode;
  const theme = darkMode ? 'dracula' : 'eclipse';
  [htmlEditor, cssEditor, jsEditor].forEach(editor => editor.setOption('theme', theme));
}

function downloadCode() {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;
  const blob = new Blob([html + css + js], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'index.html';
  link.click();
}
