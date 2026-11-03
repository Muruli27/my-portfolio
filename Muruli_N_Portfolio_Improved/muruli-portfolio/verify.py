from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parent / 'dist'

class MarkupAudit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            if attrs['id'] in self.ids:
                raise AssertionError(f"Duplicate id: {attrs['id']}")
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.refs.append(attrs[key])

html = (ROOT / 'index.html').read_text(encoding='utf-8')
audit = MarkupAudit()
audit.feed(html)
for ref in audit.refs:
    if ref.startswith('#'):
        assert ref[1:] in audit.ids, f'Missing anchor target: {ref}'
    elif not ref.startswith(('http:', 'https:', 'mailto:', 'data:', 'tel:')):
        assert (ROOT / ref).is_file(), f'Missing local asset: {ref}'

for required in ('app.js', 'content.js', 'style.css'):
    assert (ROOT / required).is_file(), f'Missing required file: {required}'
assert (ROOT / 'assets' / 'Muruli_N_Resume.pdf').read_bytes().startswith(b'%PDF-')
assert 'watch.js' not in html and 'watch.css' not in html
print(f'PASS: {len(audit.ids)} unique IDs, {len(audit.refs)} local/external references checked, résumé PDF present.')
