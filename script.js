(function(){
  const display = document.getElementById('display');
  const buttons = document.getElementById('buttons');
  let expr = '';

  function updateDisplay(){
    display.textContent = expr || '0';
  }

  buttons.addEventListener('click', (e)=>{
    const t = e.target;
    if(!t.classList.contains('btn')) return;
    const value = t.dataset.value;
    if(!value) return;

    if(value === 'C'){
      expr = '';
      updateDisplay();
      return;
    }

    if(value === '='){
      try {
        // Evaluate the expression safely for simple arithmetic
        // Replace any accidental characters, keep only digits and operators
        if(/[^0-9+\-*/.() ]/.test(expr)) throw new Error('Invalid characters');
        // eslint-disable-next-line no-new-func
        const result = eval(expr);
        expr = (typeof result === 'number' && isFinite(result)) ? String(result) : 'Error';
      } catch(err){
        expr = 'Error';
      }
      updateDisplay();
      return;
    }

    // If operator or decimal or digit
    if('+-*/.'.includes(value)){
      if(expr === '') return; // don't start with operator
      const last = expr.slice(-1);
      if('+-*/.'.includes(last)){
        // replace last operator with new one
        expr = expr.slice(0, -1) + value;
      } else {
        expr += value;
      }
    } else {
      // digit
      expr += value;
    }
    updateDisplay();
  });
})();
