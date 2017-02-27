(function(angular){
  'use strict';
angular.module('app.product')
  .controller('ProductListController',["$scope","$auth",'$location',"$stateParams","changeBrowserURL","baseUrlService","getProductCollectionService",ProductListController]);
  function ProductListController($scope,$auth,$location,$stateParams,changeBrowserURL,baseUrlService,getProductCollectionService){
  	 var plc = this;
      plc.pageNo = 0;
      plc.productsList = [];
      plc.getSingleProduct = getSingleProduct;
      plc.getProductsCollection = getProductsCollection;
      plc.productsSearchHeader = $stateParams.slug;
      console.log("inside product");
      activate();
      $scope.$on('parent', function (event, data) {
        plc.pageNo = 0;
        plc.paramData = data;
        plc.getProductsCollection();
        
      });
      function getSingleProduct(product,scrollId){
        var url = "product/singleProduct/"+product._id;//+"/"+product.myslug;
        if(scrollId){
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }
      function getProductsCollection(){
        plc.loading = true;
        plc.pageNo = plc.pageNo + 1;
        var location = $stateParams.location;
        var url ='';
        if($location.absUrl().indexOf("/productsCollectionCategory/")!=-1){
          var category = $stateParams.category;           
           url = 'product/products/category/'+category+'/'+location+'/'+plc.pageNo;
        }
        else if($location.absUrl().indexOf("/productsCollectionSubCategory/")!=-1){
          var productSubCategory = $stateParams.subCategory;
           url = 'product/products/subCategory/'+productSubCategory+'/'+location+'/'+plc.pageNo;
        }
        else if($location.absUrl().indexOf("/productsCollectionName/")!=-1){

          var productName = $stateParams.productName;
           url = 'product/products/name/'+productName+'/'+location+'/'+plc.pageNo;
           //plc.paramData = {'limit':10};
        }
        else if($location.absUrl().indexOf("/productsCollectionLocation/")!=-1){
          
           url = 'product/products/location'+'/'+location+'/'+plc.pageNo;
        }


        /*
          * This will work with mongoose-paginate only because the existencce of the button
            in html is dependant on the total documents retrieved
          * I check the total documents available to the length of array displayed.. if they both are equal
            then the button is hidden
        */
        getProductCollectionService.getProductCollection(url,plc.paramData)
        .then(function(response){
          if(response.data.docs.length===0){
            plc.noProductsToShow = true;
          }
          else{
           plc.noProductsToShow = false; 
          }
          plc.totalProducts = response.data.total;
          if(plc.productsList.length===0){
            var tempProductList = [];
            for (var i = response.data.docs.length - 1; i >= 0; i--) {
              tempProductList.push(response.data.docs[i]);

            }
            plc.productsList = tempProductList;
          }
          else{

            if(plc.paramData&&plc.pageNo==1){
              plc.productsList = [];
            }
            for (var j = response.data.docs.length - 1; j >= 0; j--) {
              plc.productsList.push(response.data.docs[j]);
            }

          }
          plc.loading = false;
        },function(response){
          console.log(response);
        });
      }
      function activate(){
        plc.getProductsCollection();
      }

    }						
    

  

})(window.angular);
