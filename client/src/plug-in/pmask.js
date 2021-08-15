export default class pmask {
	static mask(number) {
		const separators = ['(', ')', '-'];
		const pattern = 'xxx-xxx-xxxx';

		let i = 0;
		let res = '';
		for (let p of pattern) {
			if (separators.includes(p)) {
				res += p;
			} else {
				if (i < number.length) {
					res += number[i];
					i++;	
				} 

				if (i === number.length) {
					return res;
				} 
			}
		}
		return res;
	}
}