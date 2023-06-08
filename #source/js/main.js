const a = document.querySelectorAll('a');

a.forEach(item => {
   item.addEventListener('click', e => {
       e.preventDefault();
   });
});