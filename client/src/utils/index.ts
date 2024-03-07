export function weiToEth(wei: number) {
  return (wei / 10 ** 18).toFixed(18);
}

export function ethToWei(eth: number) {
  return eth * 10 ** 18;
}
