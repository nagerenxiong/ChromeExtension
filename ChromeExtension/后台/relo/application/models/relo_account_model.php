<?php
class Relo_account_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get_account_list($condition = array()){
    	$this->db->select('role, account, password');
		$this->db->from('account');
		$this->db->where($condition);
		$query = $this->db->get();
		$result = array();
		foreach ($query->result_array() as $row){
		    $result[] = $row;
		}
		return $result;
    }

}
?>