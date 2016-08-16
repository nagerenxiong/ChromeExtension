<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('relo_account_model');
	}
	public function index()
	{
		$client_site = $_GET['client_site'];
		$user = $this->relo_account_model->get_account_list(array('client_site'=>$client_site));
		$role_user = array();
		foreach ($user as $key => $value) {
			$role_user[$value['role']][] = $value;
		}
		echo json_encode($role_user);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */