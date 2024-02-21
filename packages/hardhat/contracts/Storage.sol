//SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Storage {
	uint data;

	function set(uint newData) public {
		data = newData;
	}

	function get() public view returns (uint){
		return data;
	}
}