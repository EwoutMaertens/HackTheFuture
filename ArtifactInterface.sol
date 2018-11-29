pragma solidity ^0.4.24;

contract ArtifactInterface {
    
    function getCorruptionLevel() public view returns (uint256);
    function getTeamPhase(string _teamName) public view returns (uint256);
    function changeCorruptionLevel(uint256 _newValue) public returns (bool);
    function changeCorruptionLevelDecrease(uint256 _newValue) public returns (bool);
    function getPassword(string _team) public returns (string);
    function unlockPhase1(string _answer, string _team) public returns (bool);
    function unlockPhase2(bytes32 _answer, string _team) public returns (string);
    function unlockPhase3(string _answer, string _team) public returns (bool);    
    function unlockPhase4(string _team) public returns (bool);    
    
}