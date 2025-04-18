function AddCoins(_amount)
{
	let count = parseInt(localStorage.getItem('coins')) || 0;
	count += _amount;
	localStorage.setItem('coins', count);	
	//walletDiv.textContent = `Coins: ${coins}`;
	updateWindows('Wallet', document.getElementById('Wallet_HTML').innerHTML);
}

function RemoveCoins(_amount)
{
	let count = parseInt(localStorage.getItem('coins')) || 0;
	count -= _amount;
	if (count < 0)
	{
		return false;
	}

	localStorage.setItem('coins', count);
	//walletDiv.textContent = `Coins: ${coins}`;
	updateWindows('Wallet', document.getElementById('Wallet_HTML').innerHTML);
	return true;
}

function RefreshWallet()
{
	const coins = localStorage.getItem('coins');

	if (coins !== null) {
		const walletDiv = document.getElementById('Wallet_HTML');
		
		walletDiv.textContent = `Coins: ${coins}`;
	} else {
		console.error("No 'coins' item found in localStorage.");
	}
} 
