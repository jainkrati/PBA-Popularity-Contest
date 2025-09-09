// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PBA7 {

    mapping(string=>uint) popularityMap;
    string[] names;
    address admin;

    constructor(string[] memory initialStudents)
    {
        admin = msg.sender;
        uint nameLength = initialStudents.length;
        names = initialStudents;
        for(uint i=0; i<nameLength; i++){
            string memory name = initialStudents[i];
            popularityMap[name] = 0;
     }
    }

    function reset() public {
        require(msg.sender == admin, "Only Admin");
        uint nameLength = names.length;
        for(uint i=0; i<nameLength; i++){
            string memory name = names[i];
            popularityMap[name] = 0;
     }
    }

    function voteStudents(string[] memory students) public {
        uint studentLength = students.length;
        for(uint i=0; i<studentLength; i++){
            string memory name = students[i];
            popularityMap[name] = popularityMap[name] + 1;
     }
    }

    function getMostPopularStudent() public view returns(string memory){
         uint nameLength = names.length;
         uint maxVotes = 0;
         string memory mostPopularStudent = "";
        for(uint i=0; i<nameLength; i++){
            string memory name = names[i];
            uint voteCount = popularityMap[name];
            if (voteCount > maxVotes){
                mostPopularStudent = name;
            }
     }
     return mostPopularStudent;
    }
}