
function handleSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name') ? document.getElementById('name').value : '';
  const email = document.getElementById('email') ? document.getElementById('email').value : '';
  const msg = document.getElementById('message') ? document.getElementById('message').value : '';
  const res = document.getElementById('result');
  if(!name || !email || !msg){ res.textContent = 'Mohon lengkapi semua field.'; res.className='text-red-600'; return false; }
  res.textContent = 'Terima kasih, ' + name + '! Pesan diterima (demo).';
  res.className='text-green-600';
  e.target.reset();
  return false;
}
