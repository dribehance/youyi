// by dribehance <dribehance.kksdapp.com>
var releaseTaskController = function($scope,errorServices,toastServices,localStorageService,config){
	$scope.input = {
		from_date:"",
		from_time:"",
		to_date:"",
		to_time:"",
		options:["英语","中文"],
		title:"",
		category:"business",
		price:{
			by_day:"",
			by_hour:""
		}
	}
}