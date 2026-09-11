export const rewardForOrder = (amount:number) => {
  if (amount < 500) return 0;
  if (amount < 1000) return 50;
  if (amount < 2000) return 120;
  if (amount < 5000) return 300;
  return 750;
};
export const coinValue = (coins:number) => Math.floor(coins / 10);
export const maxCoinsUsable = (balance:number,total:number) => Math.min(balance, Math.floor(total*0.2)*10);