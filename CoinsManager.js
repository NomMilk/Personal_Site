function DecreaseCoin(_amount)
{
	let count = parseInt(localStorage.getItem('coins')) || 0;
	count -= _amount;
	localStorage.setItem('coins', count);	
}

function IncreaseCoins(_amount)
{

}
