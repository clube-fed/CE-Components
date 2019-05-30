/***********************************************
find and replaces:

Tabstrip Skin: Tab_tollBrosCT =
.tabstrip.RadTabStrip_Tab_tollBrosCT

Accordion Skin: accordionTemplate =
.RadPanelBar_accordionTemplate

Site CSS folder: SiteName_css = 
A_Master/library/css/SiteName_css/

***********************************************/

/*******************
lang needed for ADA
******************/
$j('html').attr('lang','en');

/*******************
client editable navigation launcher - remove display none at code review or go live
******************/
$j('img[alt="Click to edit navigation properties"]').parent().parent('div[style*="text-align:Right"]').css({'display':'none','position':'absolute', 'right':'0px'});

/*******************
bootstrap nav
******************/
$j('.navbar li.ulMenuItem.level1, .navbar li.ulMenuItem.level2, .navbar li.ulMenuItem.level3, .side-menu li.ulMenuItem.level1, .side-menu li.ulMenuItem.level2, .side-menu li.ulMenuItem.level3').each(function(){
        $j(this).contents().filter(function(){
    return this.nodeType === 3 
}).wrap('<a href="#"></a>');
});
$j('.navbar .ulMenu.level0, .side-menu .ulMenu.level0').find('.ulMenu').addClass('dropdown-menu').attr('role','menu');
$j('.dropdown-menu').parent().children('a').after('<a class="dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></a>');
$j('.dropdown-menu').parent('li.ulMenuItem.level1').addClass('dropdown');
$j('.dropdown-menu').parent('li.ulMenuItem.level2, li.ulMenuItem.level3').addClass('dropdown dropdown-submenu');
$j('.navbar .ulMenu, .sidebar .side-menu .ulMenu').find(".selectedItem").addClass('active');  
$j('.navbar .ulMenu.level0').addClass('nav navbar-nav navbar-left');
$j('header .navbar .ulMenuItem.level2.selectedItem, .sidebar .side-menu .ulMenuItem.level2.selectedItem').closest('.ulMenuItem.level1').addClass('selectedParent');


$j('header .dropdown, .side-menu .dropdown').on({
    "shown.bs.dropdown": function() { $j(this).attr('closable', false); },
    "click":             function() { },
    "hide.bs.dropdown":  function() { return $j(this).attr('closable') == 'true'; }
});

$j('header .dropdown .dropdown-toggle, .side-menu .dropdown .dropdown-toggle').on({
  "click": function() {
    $j(this).parent().attr('closable', true );
	  $j(this).parent('li.dropdown').siblings('li.dropdown').removeClass('open');
  }
});

var everythingButTheNav = $j('*:not("header, header *")');
$j('body.page').addClass('offcanvas offcanvas-left');

/*******************
split nav setup
******************/

var splitNavLogoLink = $j('header .ulMenuItem.level1 a:contains(SplitNavLogo)');
var splitNavLogo = $j(splitNavLogoLink).addClass('logoLink');
$j(splitNavLogoLink).parent('li').addClass('logoLinkParent');

/*$j('li.ulMenuItem > a:not([class*="dropdown-toggle"])').each(function(){
   var ariaLinkLabel = "Click to view " + $j(this).text();
	$j(this).attr({'aria-label':ariaLinkLabel,'title':ariaLinkLabel});
}); 


$j('.content-area.col-md-8 .mpContent a, .sidebar .mpContent a, .mpContent button').each(function(){
   var ariaLinkLabel = "Click to view " + $j(this).text();
	$j(this).attr({'aria-label':ariaLinkLabel,'title':ariaLinkLabel});
});*/



$j('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    $j(this).parent().addClass('open');
    $j(this).parent().find("ul").parent().find("li.dropdown").addClass('open');
	$j(this).parent('li.dropdown').siblings('li.dropdown').removeClass('open');
});


$j('ul.level1.dropdown-menu, ul.level2.dropdown-menu, ul.level3.dropdown-menu, ul.level4.dropdown-menu').each(function(){

  $j(this).on('mouseenter', function(event) {
      event.preventDefault(); 
      event.stopPropagation(); 
      $j(this).parent().addClass('selectedItem');
  });

  $j(this).on('mouseleave', function(event) {
      event.preventDefault(); 
      event.stopPropagation(); 
      var theParent = $j(this).parent();
        if (!$j(theParent).hasClass('active')) {

       $j(theParent).removeClass('selectedItem'); 
      }
  });

});

$j('.side-menu .level2.selectedItem').parent('.level1').parent('.level1').addClass('selectedItem open');

$j('header li.dropdown > a').focus(function() {
	$j(this).parent('li.dropdown').addClass('open');
	$j(this).parent('li.dropdown').siblings('li.dropdown').removeClass('open');
	
 });

$j('li.dropdown.open').each(function () {
	if ($j(window).width() > 1008) {
		$j(this).siblings('li.dropdown.open').removeClass('open');
		$j(this).prevUntil('li.dropdown.open').removeClass('open');
		$j(this).offsetParent().find('li.dropdown.open').removeClass('open');
	}
});

$j('header .ulMenuItem.level1 > a:first-of-type').wrapInner('<span class="rootLevelSpan"></span>');

var notHeaderLink = $j('a').not('.nav a');
var notHeaderInput = $j('input').not('.nav input');
var notHeaderSelect = $j('select').not('.nav select');

$j(notHeaderLink, notHeaderInput, notHeaderSelect).focus(function () {
	if ( $j('.nav li.dropdown').hasClass('open') ) {
		$j('.nav li.dropdown').removeClass('open'); 
	}
});

$j('.navbar-offcanvas .nav > li > a').focus(function () {
	$j(this).parent().siblings('.open').removeClass('open');
});



/*$j('header .navbar-default .navbar-nav').each(function () {
	var numOfNavItems = $j('>li',this).length - 2;
	console.log(numOfNavItems);
	if( numOfNavItems === 1 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-1-item');
	}
	if( numOfNavItems === 2 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-2-items');
	}
	if( numOfNavItems === 3 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-3-items');
	}
	
	if( numOfNavItems === 4 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-4-items');
	}
	
	if( numOfNavItems === 5 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-5-items');
	}
	
	if( numOfNavItems === 6 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-6-items');
	}
	
	if( numOfNavItems === 7 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-7-items');
	}
	
	if( numOfNavItems === 8 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-8-items');
	}
	
	if( numOfNavItems === 9 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-9-items');
	}
	
	if( numOfNavItems === 10 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-10-items');
	}
	
	if( numOfNavItems === 11 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-11-items');
	}
	
	if( numOfNavItems === 12 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-12-items');
	}
	
	if( numOfNavItems === 13 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-13-items');
	}
	
	if( numOfNavItems === 14 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-14-items');
	}
	
	if( numOfNavItems === 15 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-15-items');
	}
	
	if( numOfNavItems === 16 ) {
		$j(this).closest('.navbar-default').addClass('root-nav-16-items');
	}	
});*/

/*$j('header #defaultNavbar .ulMenu > li.dropdown:last-of-type > ul > li:last-of-type').addClass('lastDropDown');*/


/*$j('header .navbar-offcanvas .utility-item-wrap > a:last-child').addClass('lastDropDown');
	
$j('.lastDropDown > a, a.lastDropDown').focusout(function () {
	
	$j('header .ulMenu .ulMenuItem.dropdown').removeClass('open');

	if ($j(window).width() < 1008) {
		
		console.log('keydown while focused');
		$j('.navbar-header .navbar-toggle').toggleClass('collapsed');
		$j('.offcanvas').toggleClass('active');
		$j('.navbar-header').toggleClass('active');
		setTimeout(function () { 
			$j('.container').focus();
		}, 20);	
		$j('.navbar-offcanvas a').attr('tabindex','-1');
		if( $j('.navbar-header').hasClass('active') ) {
			$j(everythingButTheNav).attr('aria-hidden','true');
		}else{
		$j(everythingButTheNav).removeAttr('aria-hidden');
			
		}
	}
	
});*/

/*******************
Global function calls - doc ready, window load, resize
******************/

$j(document).ready(function () {
	
  $j('[data-toggle="offcanvas"]').click(function () {
    $j('.offcanvas').toggleClass('active');
	  $j('.navbar-header').toggleClass('active');
	$j(this).toggleClass('collapsed');
	if( $j('.navbar-header').hasClass('active') ) {
		$j(everythingButTheNav).attr('aria-hidden','true');
		$j('[data-toggle="offcanvas"]').attr('aria-label','click to collapse navigation');
		//$j('.navbar-header .sr-only').text('menu is expanded');
		$j('.navbar-offcanvas a').removeAttr('tabindex');
		
	}else{
		$j(everythingButTheNav).removeAttr('aria-hidden');
		$j('[data-toggle="offcanvas"]').attr('aria-label','click to expand navigation');
		//$j('.navbar-header .sr-only').text('menu is collapsed');
		$j('.navbar-offcanvas a').attr('tabindex','-1');
		
		setTimeout(function () { 
			$j('.container').focus();
		}, 20);	
	}
	
  });

	$j().trumpTheBurger();
	$j().checkForDropdownAlign();
	$j('.navbar-offcanvas').css('opacity','1');
	//$j('.loadBox').addClass('loaded');
	
/*******************
boostrap sidebar nav open on level 2
******************/

var headerSelectedItemURL = $j('header li.level2.selectedItem.active.dropdown > a:first-of-type').attr('href');
var sidebarSelectedItemURL = $j('.side-menu li.level1.selectedItem.active.dropdown > a:first-of-type').attr('href');
    
	$j('.side-menu li.level1.dropdown.active').each(function() {
		if (headerSelectedItemURL === sidebarSelectedItemURL) {
			$j(this).addClass('open');
		}
	});	

});

$j(window).on('resize',function(){
	$j().trumpTheBurger();
	$j().responsifyPhotoAlbum();
	$j().responsifyTabStrip();
	$j().checkForDropdownAlign();
	if ($j(window).width() > 1008) {
		$j('.offcanvas').removeClass('active');
		$j('.navbar-header').removeClass('active');
		$j('header .dropdown').removeClass('open');
		$j('.navbar-header .navbar-toggle').blur();
		$j('.navbar-header .navbar-toggle').not('.collapsed').addClass('collapsed').attr('aria-label','click to expand navigation');
		//$j('.navbar-header .sr-only').text('menu is collapsed');
		setTimeout(function () { 
			$j('.container').focus();
		}, 20);	
		
	}
	
});

$j(window).load(function(){
   
    $j().responsifyPhotoAlbum();
	$j().responsifyTabStrip();
});


$j('header.public').each(function () {
 $j('body.page').addClass('publicPage');
});

$j('.injectContent').each(function() {
	$j(this).closest('body.page').addClass('isMobile');
});	


/*******************
right aligned navs- force dropdown to expand to the left when if it's going to hit the outer bounds of the page
******************/
$j.fn.checkForDropdownAlign = function () {
    $j('header li.dropdown').hover(function() {
        var dropdownList = $j('.dropdown-menu',this);
        var dropdownOffset = $j(this).offset();
        var offsetLeft = dropdownOffset.left;
        var dropdownWidth = dropdownList.width();
        var docWidth = $j(window).width();
        var subDropdown = $j('.dropdown-menu',this).eq(1);
        var subDropdownWidth = subDropdown.width();
        var isDropdownVisible = (offsetLeft + dropdownWidth <= docWidth);
        var isSubDropdownVisible = (offsetLeft + dropdownWidth + subDropdownWidth <= docWidth);
        if (!isDropdownVisible || !isSubDropdownVisible) {
            $j(dropdownList).addClass('pull-right');
        } else {
            $j(dropdownList).removeClass('pull-right');
        }
    });
}

/*******************
global header nav function for switching desktop to mobile, adding ADA labels etc
******************/
$j.fn.trumpTheBurger = function () {

	if ($j(window).width() > 1008) {
		$j('body.page').addClass('desktopNav');
		$j('body.page').removeClass('burgerNav');
		$j('header .navbar-toggle').attr('tabindex','-1').removeAttr('aria-label');
		//$j('.navbar-header .sr-only').text('menu');
		$j('.navbar-offcanvas a').removeAttr('tabindex');
	}
	
	if ($j(window).width() < 1008) {
		$j('body.page').removeClass('desktopNav');
		$j('body.page').addClass('burgerNav');
		$j('header .navbar-toggle').removeAttr('tabindex').attr('aria-label','click to expand navigation');
		//$j('.navbar-header .sr-only').text('menu is collapsed');
		$j('.navbar-offcanvas a').attr('tabindex','-1');
	}
	
	if($j('body.page').hasClass('isMobile desktopNav')){
		$j('body.page').addClass('burgerNav').removeClass('desktopNav');
	}
}

/*******************
boostrap nav dropdown folder fix
******************/

$j('.navbar-nav .ulMenuItem > a:first-of-type[href="#"]').addClass('folderLink').removeAttr('href');
/*$j('.folderLink').click(function(e){
	e.preventDefault();
});*/


/*******************
Global Script FED / Content loading expand and Toggle Click to Edits widget
******************/

$j('.GS-toggle').on('click', function () {
    $j('.global-scripts').toggleClass('minimized')
});

$j('#toggle-edits').change(function () {
    if (!this.checked) {
	//  ^
	   $j('.clickToEditDiv').show();
	   $j( "img[title='Click to edit Plugin Properties']" ).parentsUntil( "table" ).show();
	} else {
		$j('.clickToEditDiv').hide();
		$j( "img[title='Click to edit Plugin Properties']" ).parentsUntil( "table" ).hide();
	}
});

/*******************
responsive TabStrip
******************/

$j.fn.responsifyTabStrip = function () {
var outerTableWidth = $j('.container table[id$="tblTop"]').outerWidth();
$j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1').css('width',outerTableWidth);
var amountOfTabs = $j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1 > ul > li').length;
var outerTabWidth = $j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1 > ul > li').outerWidth();
var actualOuter = outerTableWidth + 50;
  var totalWidthofTabs = outerTabWidth * amountOfTabs;
var equalWidthofTabs = 	outerTableWidth / amountOfTabs;
var tabStripHeight = $j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1').outerHeight();
var radMultitopSpace = tabStripHeight + 1;
$j('.container div[id$="radMultTop"]').css('margin-top',radMultitopSpace);	
$j('.container .tsContent').css('width',outerTableWidth);	
	if ($j(window).width() < 1201) {
		$j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1 > ul').css('width','100%');
		$j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1 > ul > li').css('width','auto');	
	}
	if ($j(window).width() > 1201) {
		$j('.container .tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1 > ul').css('width','100%');
	}
	
}

/*******************
responsive Photo Album
******************/

$j.fn.responsifyPhotoAlbum = function () {
$j( 'div[id^="photoPluginWrapper"]' ).each( function(){
	$j('.media-window.photo-album-window .pa-prev a').attr('title','previous image');
	$j('.media-window.photo-album-window .pa-next a').attr('title','next image');
	var selectedPADiv = $j('> div:not([style*="none;"])', this);
	var selectedPADivHeight = $j(selectedPADiv).outerHeight();
	var spaceBelowPA = 0;
	var totalPAHeight = selectedPADivHeight + spaceBelowPA;
	$j('.photoAlbumImage').removeAttr('ondblclick');
	$j('.media-window.photo-album-window h2:empty').remove();
	$j('.media-window.photo-album-window h4 a:empty').remove();
	$j('.media-window.photo-album-window h4:empty').remove();  
		$j('.photoAlbumImage').each( function(){
		var photoAlbumHeading = $j(this).parent().parent().parent().siblings().children().children('h2').text();
			$j(this).attr('alt',photoAlbumHeading);
			if (photoAlbumHeading == '') {
				$j(this).attr('alt','');
			}else{
				$j(this).attr('alt',photoAlbumHeading);
			}
		});
	
		$j('.photoGalleryWrapDiv img.imagePreloader').each( function(){
		var theAltText =  $j(this).parent().siblings().children().find('.photoAlbumImage').attr('alt');
		$j(this).attr('alt',theAltText);	
		});
	$j(this).css({'width':'100%','height':totalPAHeight+'px'});
	});
}


/*******************
ADA for tabstrip and accordion
******************/

$j('.tabstrip.RadTabStrip_Tab_tollBrosCT > .levelwrap.level1 > ul > li > a > span.wrap > span.innerWrap').each(function(){
   var ariaLinkLabel = "Click to read more about " + $j(this).text();
	$j(this).closest('a').attr({'aria-label':ariaLinkLabel,'title':ariaLinkLabel});
});

$j('.RadPanelBar_accordionTemplate a.rpLink').each(function(){
	var accordTitleText = $j(this).find('.rpText').text();
	var ariaLinkLabelExpand = "Click to toggle the accordion and read more about " + accordTitleText;
	var miniPageID = $j(this).siblings('.rpSlide').find('.mpContent').attr('id');
	var ariaIDSlide = miniPageID + "_slide";
	var ariaIDAccord = miniPageID + "_accord";
	$j(this).siblings('.rpSlide').attr({'id':ariaIDSlide,'role':'region','aria-labelledby':ariaIDAccord});
	$j(this).attr({'id':ariaIDAccord, 'aria-label':ariaLinkLabelExpand,'title':ariaLinkLabelExpand,'aria-expanded':'false','aria-controls':ariaIDSlide});
	
});	

/*******************
dynamically bring in tabstrip and accordion styles only when needed
******************/

$j('div.RadPanelBar.RadPanelBar_accordionTemplate').each( function(){
	$j('head').append('<link rel="stylesheet" type="text/css" href="A_Master/library/css/UCPaloAlto_2019_css/Accordion.accordionTemplate.css">' );
});	

$j('div.tabstrip.RadTabStrip_Tab_tollBrosCT').each( function(){
	$j('link[href*="A_Master/NET/themes/Default/styles.css"]').remove();
	$j('head').append('<link rel="stylesheet" type="text/css" href="A_Master/library/css/UCPaloAlto_2019_css/ResponsiveTabStrip.css">' );
});	

$j('div[id^="calPlugin"] > div[id^="calPlugin"] .cal-item, div[id^="newsPlugin"] > div[id^="newsPlugin"] .news-item').unwrap();


/*******************
banner images, various content area minipages etc
******************/
var mwmpOne = $j( '.media-window > .mpContent:first-of-type');
var mwmpTwo = $j(mwmpOne).siblings('.mpContent'); 

$j(mwmpTwo).each( function(){

	$j(this).appendTo(mwmpOne);
	
	/*$j('img',this).attr('alt','');*/
	
	/*******************
	if page title overlays image, wrap it
	*******************/

 });

$j(mwmpOne).each( function(){
	$j('h1',this).unwrap();
		$j( 'h1',this ).each( function(){
		var bannerImgSib = $j(this).siblings('img');
		if(!$j.trim($j(this).html()).length) {
			$j(this).remove();
		}else{
			$j(bannerImgSib).addClass('banner-pagetitle-img-sibling'); 
		}
		
		$j(this).wrap('<div class="banner-heading-overlay-wrap"><div><div ///>');
		
	});
	$j(this).children('.mpContent').unwrap();
 });	


$j('.mpContent').parent('.media-window').parent('.row').parent('.container').children('.row').children('.media-window').addClass('col-xs-12');


/*******************
hide vnav if empty
******************/

$j( '.sidebar .side-menu ul' ).each( function(){
	var dsParentDiv = $j(this).closest('div[id$="_dpPlaceholder"');
    if(!$j.trim($j(this).html()).length) { 
		$j(dsParentDiv).hide();
    }else{
   		
	}
 });

$j( '.content-area .rpTemplate .mpContent img:not([alt])' ).each( function(){
	var theAccordTitle = $j(this).parent().parent().parent().parent().siblings().children().find('.rpText').text();
	accordImgAltText = "Image for " + theAccordTitle + "Accordion Content";
	$j(this).attr('alt',accordImgAltText);
 });

$j( '.content-area .tsContent .mpContent img:not([alt])' ).each( function(){
	$j(this).attr('alt','Image for Tab Strip Content');
 });


/*******************
login plugin stuff ADA
******************/

$j('.login-wrap div[id*=wrapLogin] input[type="text"], .login-wrap div[id*=wrapLogin] input[type="password"]').each(function() {
	var logInputID = $j(this).attr('id');
	var logInputVal =  $j(this).attr('value');
	$j('<label class="logInputLabel" />').attr('for',logInputID).css({'position': 'absolute','left':'-9999px'}).insertBefore(this);
	$j('.logInputLabel[for*="_txtUsername"]').text('Username');
	$j('.logInputLabel[for*="_txtPassword"]').text('Password');
});	

$j('.login-wrap div[id*=wrapLogin] abut').attr('tabindex','3');
$j('.login-wrap div[id*=wrapLogin] login-bot-l input').attr('tabindex','4');
$j('.login-wrap div[id*=wrapLogin] login-bot-r a').attr('tabindex','5');
$j('<span>Error: </span>').prependTo('.login-wrap .errLogin');

$j('.login-wrap div[id*=wrapLogin] .errLogin:contains(username)').each(function() {
	$j('.login-wrap .advLogUsername').css({'background': 'red','color':'white'});
});

$j('.login-wrap div[id*=wrapLogin] .errLogin:contains(password)').each(function() {
	$j('.login-wrap .advLogPassword').css({'background': 'red','color':'white'});
});	

$j('footer .footer-bottom-links ul li a').attr('target','_blank');
$j('#txtIeAltUsername').text('Username');
$j('#txtIeAltPassword').text('Password');
$j('.login-page .login-logo').attr('tabindex','1');	
$j('.login-wrap .advLogUsername').attr('tabindex','2');	
$j('.login-wrap .advLogPassword').attr('tabindex','3');
$j('.login-wrap .abut').attr('tabindex','4');
$j('.login-wrap .advLogRemoveChk').attr('tabindex','5');
$j('.login-wrap .login-bot-r a').attr('tabindex','6');
$j('.login-page').closest('#defaultnetform').parent('body').addClass('theActualLoginPage')
$j('.theActualLoginPage > #defaultnetform > div[id^="masterPageUC_MSTR"]').addClass('outerMasterPageWrap');
$j('.outerMasterPageWrap footer').addClass('login-footer');
$j('.login-wrap table span a').attr('aria-label','Click here to Logout');
/*$j('.login-wrap .login-bot-r a').renameAttr('onclick', 'onkeypress' );*/

$j('a[onclick*="changeUN"]').attr('aria-label','click to open username change dialog box');
$j('a[onclick*="changePW"]').attr('aria-label','click to open password change dialog box');
$j('a[onclick*="changeUN"],a[onclick*="changePW"]').attr('role','button');

$j('.login-wrap .login-bot-l span.advLogRemoveChk').focus(function() {
	//$j('.login-wrap .login-bot-l input[type="checkbox"]').focus();
	//$j('.login-wrap .login-bot-l input[type="checkbox"]').focus(function() {
		$j(this).on('keydown', function (e) {
			if ((e.which == 13)) {
				e.preventDefault();
				$j('.login-wrap .login-bot-l input[type="checkbox"]').trigger('click');
			}
			if ((e.which == 9)) {
				e.preventDefault();
				$j('.login-wrap .login-bot-r a').focus();
			}
		});
   //});
 });


$j('.login-wrap .login-bot-r a').focus(function() {
	$j(this).on('keydown', function (e) {
			if ((e.which == 13)) {
				e.preventDefault();
				$j(this).trigger('click');
			}
			
		});
 });

/*******************
convert login page minipage image into background img
******************/

$j( '.login-bg-src-wrap' ).each( function(){
	 var logBGImg = $j(this).find(' .mpContent > img');
        var logBGImgSrc = $j(logBGImg).attr('src');
	 $j(this).closest('.login-page-blackout').css('background-image', ' url(' + logBGImgSrc + ')');
        $j(logBGImg).css('display','none');
	
});	


jQuery.fn.extend({
  renameAttr: function( name, newName, removeData ) {
    var val;
    return this.each(function() {
      val = jQuery.attr( this, name );
      jQuery.attr( this, newName, val );
      jQuery.removeAttr( this, name );
      // remove original data
      if (removeData !== false){
        jQuery.removeData( this, name.replace('on','') );
      }
    });
  }
});

$adLevel = "-1";

/*******************
client request to hide certain module stuff different levels
******************/

if(!($adLevel == "3" || $adLevel == "5" || $adLevel == "9")) {
  /*$j('#axisCalendarModuleWrapper #calendarLinkBar').remove();*/
	$j('.module #articlePrintLink').hide();
 }

if($adLevel == "0") {

  $j('#axisCalendarModuleWrapper #calendarLinkBar').remove();

 }


/*******************
placeholder event image when no image is assigned
******************/

$j('.cal-img > a').each(function () {
    //$j( 'img', this ).attr('alt','');
	if ( $j( 'img', this ).length == 0 ) {
		$j( '<img src="Images/images/dynamic/getImage.gif?ID=100001051">' ).appendTo(this);
	}
});


/*******************
calendar event rebuild for ADA stuff and outer anchor functionality
******************/


$j( '.content-area .cal-item' ).each( function(){
	$j(this).parent('div').addClass('cal-flex');
	var eventTitle = $j('.cal-content h2',this).text();
	var ImageAltText = "Image for " + eventTitle;
	$j( '.cal-img img',this).attr('alt',ImageAltText);
	var ariaLinkLabel = "Click to view " + $j('h2',this).text();
	var link_href = $j('a', this).attr('href');
	var outerLinkAnchor = $j( "<a class='outerEventLinkAnchor' tabindex='-1'></a>" ).attr({'href':link_href});
	$j( this ).wrapInner( outerLinkAnchor );
	
});

$j('.cal-img').each(function () {
	var calimgoverlay = $j('.cal-img-overlay',this);
    
	if ( $j( 'img', this ).length == 0 ) {
		//$j( '<img src="Images/images/dynamic/getImage.gif?ID=101499">' ).appendTo(this);
		$j( '<img class="event-img" src="Images/images/dynamic/getImage.gif?ID=100001051">' ).insertAfter(calimgoverlay);
	}
	
	$j( 'img', this ).attr('alt','');
});
	


/*******************
placeholder article image when no image is assigned
******************/
	
 $j('.news-img').each(function () {
    $j( 'img', this ).attr('alt','');
	if ( $j( 'img', this ).length == 0 ) {	
 		$j( '<img src="Images/images/dynamic/getImage.gif?ID=100009">' ).appendTo(this);
	}
});

/*******************
news article rebuild for ADA stuff and outer anchor functionality
******************/
	
$j( '.content-area .news-item' ).each( function(){
	$j(this).parent('div').addClass('news-flex');
	var articleTitle = $j('.news-content a',this).text();
	var ImageAltText = "Image for " + articleTitle;
	$j('.news-img img',this).attr('alt',ImageAltText);
	var ariaLinkLabel = "Click to view " + $j('a',this).text();
	var newsImgSrc = $j('.news-img img',this).attr('src');
	$j('.news-img',this).css('background-image', ' url(' + newsImgSrc + ')');
	var link_href = $j('a', this).attr('href');
	var outerLinkAnchor = $j( "<a class='outerNewsLinkAnchor' tabindex='-1'></a>" ).attr({'href':link_href});
	$j( this ).wrapInner( outerLinkAnchor );
});
$j('div[id^="newsPlugin"]>.smallerfont').remove();
	
	
/*******************
news calendar, callouts etc if an extra hover trigger is needed
******************/
$j('.cal-item, .content-callout-item, .news-item .text-callouts-item').hover(function () {
	$j(this).toggleClass('hovered');
	
});	


$j('div[id^="calPlugin"] > div[id^="calPlugin"] .cal-item, div[id^="newsPlugin"] > div[id^="newsPlugin"] .news-item').unwrap();
/*******************
icons - hide from screen readers
******************/

$j('[class*="icon "][class*="icon-"]').attr('aria-hidden','true');





/*******************************************************************************************************************************************************
modules
********************************************************************************************************************************************************/


/*******************
attempt to gut out unnecessary empty table elements
******************/

$j( '.modulewrap table' ).each( function(){
	
    $j('td').filter(function() {
    return $j(this).html() === ' ';
	}).addClass('emptyModuleTableCell');
    $j('img[src$="1x1.gif"]').remove();
    $j('td:empty, td.tnavBorder',this).addClass('emptyModuleTableCell');
	$j('.moduleTabsWrapper .emptyModuleTableCell, .tnavBorder.emptyModuleTableCell').remove();
	$j('tr:empty',this).addClass('emptyModuleTableRow');
	$j('.modulewrap table tr').each( function(){
      if($j(this).text().trim().length < 1){
      	$j(this).addClass('emptyModuleTableRow');
      }
		
	});
	$j('tr[class=""]').removeAttr('class');
	$j('.modulewrap table td.plgHeaderBar').each( function(){
      if($j(this).text().trim().length < 1){
      	$j(this).addClass('emptyPlgHeaderBar');
      }	
	});
	$j('body[class*=alendar] table font:contains("Filter: Show")').addClass('moduleFilterLabel');
});

$j('.NETEventView .module .col-xs-12>table .plgHeaderBar').parent().parent().parent().parent().parent().siblings('.emptyModuleTableRow').remove();
$j('body[class*="v35ProfileUpdateReport"] input.abut[id*="_btnCreateReport"]').closest('td[align="center"]').removeAttr('align');
$j('.moduleTabsWrapper a').attr('role','link');




/*******************
when on a module, bring in styles, form js, make module tabs tabbable
******************/
$j('.modulewrap').each( function(){
	$j('head').append('<link rel="stylesheet" type="text/css" href="A_Master/library/css/UCPaloAlto_2019_css/modules.css">' );
	//$j('body.page').append('<script type="text/javascript" src="js/formBlaster.js"></script>' );
	$j('.moduleTabText > a, .injectContent .mobileTabs li a').each(function() {
		var modTabClassName = $j(this).html().replace(' ', '');
		$j(this).parent('.moduleTabText').addClass(modTabClassName +' tabHasLink');
		$j(this).closest('td[class*="tNav"],li[class*="tab"]').addClass(modTabClassName+'Tab');
	});	

	$j('.moduleTabText:not(.tabHasLink)').each(function() {
		var modTabClassName = $j(this).html().replace(' ', '');
		$j(this).addClass(modTabClassName+'tab');
		$j(this).closest('td').addClass(modTabClassName+'Tab');
	});	
});

/*******************
modul img alt props and element attributes
******************/

$j('.calendarPrevLink').attr('alt','previous');
$j('.calendarNextLink').attr('alt','next');
$j('.calendarLegend img[src*="losed"]').attr('alt','Closed');
$j('.calendarLegend img[src*="old"][src*="ut"]').attr('alt','Sold Out');
$j('.calendarLegend img[src*="ait"][src*="ist"]').attr('alt','Wait Listed');
$j('.calendarLegend img[src*="eserved"]').attr('alt','Reserved');
$j('.calendarLegend img[src*="vailable"]').attr('alt','Available');
$j('.calendarLegend img[src*="ot"][src*="pen"]').attr('alt','Not Yet Open');
$j('img[src*="ico_CalTodayPointer.gif"]').attr('alt','Today');
$j('#eventView #eventHeaderBack img[src$="leftArrow.gif"]').attr('alt','back');
$j('#eventView #eventHeaderTitle img[src$="leftArrow.gif"]').attr('alt','prev event');
$j('#eventView #eventHeaderTitle img[src$="rightArrow.gif"]').attr('alt','next event');
$j('img[src$="vcardicon.gif"]').attr('alt','Add to Contacts');
$j('img[src$="_inactive.gif"]').attr('alt','Inactive');
$j('img[src$="ico_s4_admin.gif"]').attr('alt','Administrator');
$j('img[src$="ico_s4_editor.gif"]').attr('alt','Editor');
$j('img[src$="Print.gif"]').attr('alt','Click to view Printable Version');
$j('table[id$="Photo"] p img').attr('alt','Member Photo');
$j('table[id$="Photo"] p img[src*="memphotona.gif"]').attr('alt','Member Photo not available');
$j('table[id$="Photo"] p img[src$="memphotona.gif"]').attr('src','A_Master/Images/memphotona_HIGHCONTRAST.gif');
$j('.MemberEdit table[id$="rosterControl_tblInput"] td input[type="checkbox"]').parent('td').attr('colspan','2');
$j('input[type="checkbox"]').attr('role','checkbox');
$j('input[type="radio"]').attr('role','radio');
$j('.mobileButton[id*="ilter"]').attr({role:'button'});
$j('.module [id$=tblAdminBar] td a, .module [id$=tblAdminBar] td input').attr({role:'button'});
$j('#adminDashboardCETab #ceDashboardColumn2 > ul:first-of-type >li.groupHeader:first-of-type > h3').text('Global');
$j('input#btnQuickFilter').renameAttr('onmousedown', 'onclick' );
$j('input#btnQuickFilter').attr('role', 'button' );

/*******************
article stuff
******************/

$j('#articlePrintLink > a').attr({role:'button'});
$j('.editArticleLink').attr({role:'button'});
$j('body[class*=ArticleList] a[href*="_ArticleView"]').attr({role:'link'});

/*******************
directory stuff
******************/
$j('.MemberEdit table[id$="rosterControl_tblInput "] td em, .v35Directory table[id$="_tblMyProfile"] td em').replaceWith(function(){
    return $j("<label />").append($j(this).contents());
});
$j('.MemberEdit .emptyModuleTableCell').css('display','table-cell');
$j('.MemberEdit table[id$="rosterControl_tblInput"] td input[type="text"],.MemberEdit table[id$="rosterControl_tblInput"] td select, .v35Directory table[id$="_tblMyProfile"] td input[type="text"], .v35Directory table[id$="_tblMyProfile"] td select').each( function(){
    var thisID = $j(this).attr('id');
	$j(this).parent('td').siblings().children('label').attr('for',thisID);
});
$j('.modRosterHiliteHiddenField a:empty, [id$=rosterControl_tblListing] [class^=RosterRow]>td a:empty').remove();
$j('div.mobileTabsWrapper ul.mobileTabs li a:contains(MyProfile)').text('My Profile');
/*$j('.MemberEdit table[id$="rosterControl_tblInput"] td[width="5"], .MemberEdit table[id$="rosterControl_tblInput"] td:empty').remove();*/


/*******************************************
calendar stuff
******************************************/


/*******************
mobile calendar search return ADA
******************/
$j('.injectContent #calendarSwitch #doSearch').click(function () {
    // Get thevalue and trim it
    var name = $j.trim($j('.injectContent #calendarSwitch #searchInput').val());
    // Check if empty of not
    if (name === '') {
        alert('No Search Criteria Specified');
        return false;
    }
});

/*******************
calendar - add day row
******************/

var calViewMonths = $j('body[class*=alendar] [id$="_jan"], body[class*=alendar] [id$="_feb"], body[class*=alendar] [id$="_mar"], body[class*=alendar] [id$="_apr"], body[class*=alendar] [id$="_may"], body[class*=alendar] [id$="_jun"], body[class*=alendar] [id$="_jul"], body[class*=alendar] [id$="_aug"], body[class*=alendar] [id$="_sep"], body[class*=alendar] [id$="_oct"], body[class*=alendar] [id$="_nov"], body[class*=alendar] [id$="_dec"]');

$j('> tbody > tr:first-of-type',calViewMonths).addClass('firstCalMonthRow');

$j('.firstCalMonthRow').each(function () {
	$j('<tr><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>').insertBefore(this);
});

$j('<span class="nc-icon-glyph ui-1_calendar-grid-61" aria-hidden="true"></span>').prependTo('body[class*=alendar] .modCalMonth>tbody>tr>td:first-child a');
$j('body[class*=alendar] .modCalMonth>tbody>tr>td:first-child a').each( function(){
	var theLinkTitle = $j(this).attr('title');
	$j('img',this).attr('alt',theLinkTitle);
});

$j('.RadCalendarMonthView .emptyModuleTableRow th[scope="col"]:empty').text('Month / Year Picker');
$j('body[class*=alendar] .rcWeek > .rcViewSel[scope="col"]').text('Week');
var hiddenCalTitleInputIDWeek = $j('body[class*=alendar] [id^=axisCalendar] .calendarTitleBar ~ .RadPicker_Silk .rcTable .RadInput_Silk > input[type="text"]').attr('id');
$j('<label></label>').text('Date').attr('for',hiddenCalTitleInputIDWeek).prependTo('.calendarTitleBar ~ .RadPicker_Silk .rcTable .RadInput_Silk').hide();
var skipLinkTargetCalIconWeek = $j('body[class*=alendar] [id^=axisCalendar] .calendarTitleBar ~ .RadPicker_Silk .rcTable .rcCalPopup').closest('.RadPicker_Silk').attr('id');
var skipLinkTargetCalIconWeekHref = "#"+skipLinkTargetCalIconWeek;
$j('body[class*=alendar] [id^=axisCalendar] .calendarTitleBar ~ .RadPicker_Silk .rcTable .rcCalPopup').attr({'href':skipLinkTargetCalIconWeekHref,tabindex:'0',role:'button'});
$j('.RadCalendarMonthView_Silk a, .RadCalendarMonthView_Silk input[type="button"]').attr({tabindex:'0',role:'button'});
$j('body[class*=alendar] [id^=axisCalendar] .tnavTabON table[id$="_placeholder1"] table[cellpadding="3"][cellspacing="1"] td:contains(Event Title)').addClass('calSearchLabelCell_eventTitle');
$j('body[class*=alendar] [id^=axisCalendar] .tnavTabON table[id$="_placeholder1"] table[cellpadding="3"][cellspacing="1"] td:contains(Event Between)').addClass('calSearchLabelCell_eventBetween');
$j('body[class*=alendar] [id^=axisCalendar] .tnavTabON table[id$="_placeholder1"] table[cellpadding="3"][cellspacing="1"] td:contains(and)').addClass('calSearchLabelCell_and');

$j('.calSearchLabelCell_eventTitle').html(function(_, html) {
   	return html.replace(/(Event Title)/g, '&nbsp;');
});

$j('.calSearchLabelCell_eventBetween').html(function(_, html) {
   	return html.replace(/(Event Between)/g, '&nbsp;');
});

$j('.calSearchLabelCell_and').html(function(_, html) {
   	return html.replace(/(and)/g, '&nbsp;');
});

$j('body[class*=alendar] [id^=axisCalendar] .tnavTabON table[id$="_placeholder1"] table[cellpadding="3"][cellspacing="1"] td input[type="text"][id$="_txtSearchTitle"], body[class*=alendar] [id^=axisCalendar] .tnavTabON table[id$="_placeholder1"] table[cellpadding="3"][cellspacing="1"] td input[type="text"][id$="rdpStartDate_dateInput"][class*="riTextBox"],body[class*=alendar] [id^=axisCalendar] .tnavTabON table[id$="_placeholder1"] table[cellpadding="3"][cellspacing="1"] td input[type="text"][id$="rdpEndDate_dateInput"][class*="riTextBox"]').each( function(){
	var thisID = $j(this).attr('id');
	$j('<label></label>').attr('for',thisID).insertBefore(this);
	$j('label[for$="txtSearchTitle"]').text('Event Title').addClass('calSearchLabel_eventTitle');
	$j('label[for$="StartDate_dateInput"]').text('Event Between').addClass('calSearchLabel_eventBetween');
	$j('label[for$="EndDate_dateInput"]').text('and').addClass('calSearchLabel_eventAnd');
});

$j('.tnavTabON a[id$="_prevSel"],.tnavTabON a[id$="_nextSel"]').attr('role','button');

$j('td[class^="qFilter"] input[type="text"]').each( function(){
	var thisID = $j(this).attr('id');
	$j('<label></label>').text('label').attr('for',thisID).insertBefore(this).hide();
					  
});	


/*******************
aria lablels on inaccessible module elements
******************/

function ariasForModules() {
	var i;
	var moduleAnchors = [
		/*dumb random inconsistent camelcase DynamicModule urls*/
		'#defaultnetform:not([action*="ynamic"][action*="odule"]) .master-wrap > .module.container a',
		'#defaultnetform:not([action*="ynamic"][action*="odule"]) .master-wrap > .module.container button',
		'#defaultnetform:not([action*="ynamic"][action*="odule"]) .master-wrap > .module.container [onclick]',
		'#defaultnetform:not([action*="ynamic"][action*="odule"]) .master-wrap > .module.container [ononmousedown]'
	];
	var moduleSelfClosers = [
		'.login-page-box .abut',
		'#defaultnetform:not([action*="ynamic"][action*="odule"]) .master-wrap > .module.container input[type="submit"]',
		'#defaultnetform:not([action*="ynamic"][action*="odule"]) .master-wrap > .module.container input[type="button"]'
	]
	for (i = 0; i< moduleAnchors.length || i< moduleSelfClosers.length; ++i) {
		$j(moduleAnchors[i]).each( function(){	
			var ariaLinkLabel = "Click to view " + $j(this).text();
			$j(this).attr({'aria-label':ariaLinkLabel,'title':ariaLinkLabel});
		});	
		$j(moduleSelfClosers[i]).each( function(){	
			var ariaLinkLabel = "Click to " + $j(this).attr('value');
			$j(this).attr({'aria-label':ariaLinkLabel,'title':ariaLinkLabel});
		});	
	}
}
ariasForModules();

/*******************
global button aria for module buttons
******************/
$j('.module.container #calendarLinkBar a, .module.container table[id$="_tblProfilePage"] a, #updatePhotoiframe a, .module .adminBar input[type="button"], .module .adminbar input[type="button"], .module .adminBar input[type="submit"], .module .adminbar input[type="submit"], #printLink a').attr({tabindex:'0',role:'button'});


$j('.axisDialogBox').each( function(){
	console.log('dialog open');
});






/***************************************************************************************************************************************************
SITE-SPECIFIC CONTENT LAYOUT STUFF
**************************************************************************************************************************************************/

/*******************
fancy public home callouts
******************/
/*$j('.calloutsRow .callout .mpContent').each( function(){
	var callout_href = $j('a', this).attr('href');
    $j('a', this).wrapInner('<span></span>');
	$j('img', this).wrap('<div class="calloutImgWrap"></div>');
	var outerCalloutAnchor = $j( "<a class='outerCalloutAnchor'></a>" ).attr( "href", callout_href);
	$j(this).children().not('.calloutImgWrap').wrapAll("<div class='innerCalloutContent'><div><div><div></div></div></div></div>");
	$j(this).wrap(outerCalloutAnchor);
	$j('.outerCalloutAnchor .innerCalloutContent a').hide();

});

$j('.calloutsRow .callout .clickToEditDiv').each( function(){
    $j(this).prev().prev().append(this);
 });

$j('.calloutsRow .callout a.clickToEditAnchor').click( function(e){
    e.preventDefault();
 });

$j('.calloutsRow .callout .mpContent .calloutImgWrap').each( function(){
	$j('<div class="calloutOverlay"></div>').prependTo(this);
});	*/

$j( '.opaqueCalloutPanelRow .mpContent, .calloutsRow .callout .mpContent').each(function(){
	var plugTitleText = $j('td.plgHeaderBar b',this).text();
	//console.log(plugTitleText);
	var plugTitleTable = $j('td.plgHeaderBar b',this).closest('table');
	var CTEDSib = $j(this).next('.clickToEditDiv');
	var CTEDSibAnchor = $j(CTEDSib).children('.clickToEditAnchor');
	$j(CTEDSibAnchor).attr('title',plugTitleText);
	$j('<span></span>').prependTo(CTEDSib);
	$j(CTEDSib).children('span').text(plugTitleText);
	$j(plugTitleTable).remove();
	
});

$j( '.calloutsRow .callout .mpContent:first-of-type' ).each( function(){
	var CTED = $j(this).next('.clickToEditDiv');
	$j('br',this).remove();
	
	var callout_href = $j('a', this).attr('href');
    $j('a', this).wrapInner('<span></span>');
	$j('img', this).wrap('<div class="calloutImgWrap"></div>');
	var outerCalloutAnchor = $j( "<a class='outerCalloutAnchor'></a>" ).attr( "href", callout_href);
	$j(this).children().not('.calloutImgWrap').wrapAll("<div class='innerCalloutContent'><div><div><div class='lastCalloutChild'></div></div></div></div>");
	$j( this ).wrap( outerCalloutAnchor );
	$j('.outerCalloutAnchor .innerCalloutContent a').hide();
	
});

$j( '.calloutsRow .callout .mpContent:nth-of-type(2)' ).each( function(){
	var CTED = $j(this).next('.clickToEditDiv');
	var firstMPMP = $j(this).siblings('.outerCalloutAnchor').children('.mpContent').children().children().children().children('.lastCalloutChild');
	$j(this).appendTo(firstMPMP);
	$j(this).addClass('calloutImgWrap').removeClass('mpContent');
});
$j( '.calloutsRow .callout .mpContent:nth-of-type(3)' ).each( function(){
	var CTED = $j(this).next('.clickToEditDiv');
	var firstMPMP = $j(this).siblings('.outerCalloutAnchor').children('.mpContent').children().children().children().children('.lastCalloutChild');
	$j(this).appendTo(firstMPMP);
	$j(this).addClass('bottomWhiteBox').removeClass('mpContent');

});	

$j( '.calloutsRow .callout .mpContent:first-of-type:last-of-type' ).each( function(){
	var CIW = $j('.calloutImgWrap',this);
	$j('<div class="calloutOverlay"></div>').appendTo(CIW);
	$j(CIW).prependTo(this);
	$j('h3',this).unwrap();
});	


$j('.outerCalloutAnchor  ~ .mpContent img').each( function(){
	
	
	var theOtherMPC = $j(this).parent('.mpContent').siblings('.outerCalloutAnchor').children('.mpContent');
	var COO = $j(this).parent('.mpContent').siblings('.outerCalloutAnchor').children('.mpContent').children('.calloutOverlay');
	var orphanedTitle = $j(this).parent('.mpContent').siblings('.outerCalloutAnchor').children('.mpContent').children('h3');
	var LCC = $j(this).parent('.mpContent').siblings('.outerCalloutAnchor').children('.mpContent').children('.innerCalloutContent').children().children().children('.lastCalloutChild');
	$j(orphanedTitle).appendTo(LCC);
	$j(COO).insertAfter(this);
	$j(this).parent('.mpContent').addClass('calloutImgWrap').prependTo(theOtherMPC);
	
});


/*******************
private home quick links as an .abut grid
******************/
$j( '.privHome .quickLinksWrap nav > ul > li' ).each( function(){
	$j(this).closest('ul').addClass('row');
	$j(this).addClass('col-md-4 col-sm-6 col-xs-12');
	$j('a',this).addClass('abut');
	
});	

/*$j( '.privHome .watermarkBG .watermarkBGImgContainer' ).each( function(){
	 var watermarkImg = $j(this).find(' .mpContent > img');
        var watermarkImgSrc = $j(watermarkImg).attr('src');
        $j(this).closest('.watermarkBG').css('background-image', ' url(' + watermarkImgSrc + ')');
        $j('.watermarkBGImgContainer .mpContent').css('display','none');
	
});*/

$j( '.privHome .watermarkBG .watermarkBGImgContainer' ).each( function(){
	 var watermarkImg = $j(this).find(' .mpContent > img');
        var watermarkImgSrc = $j(watermarkImg).attr('src');
        $j(this).closest('.media-window').css('background-image', ' url(' + watermarkImgSrc + ')');
        $j('.watermarkBGImgContainer .mpContent').css('display','none');
	
});


$j( '.panel-image' ).each( function(){
	 var panelBGImg = $j(this).find(' .mpContent > img');
        var panelBGImgSrc = $j(panelBGImg).attr('src');
        $j(this).closest('.panel-image').css('background-image', ' url(' + panelBGImgSrc + ')');
        $j(panelBGImg).css('visibility','hidden');
	
});

$j( '.panel-copy .mpContent' ).each( function(){
	 $j(this).wrap('<div><div><div><div ////>');
});	
$j('.mpContent > .eagle').each( function(){
	var notEagleContent = $j(this).children().not('h2');
	$j(notEagleContent).insertAfter(this);
});	


$j( '.opaqueCalloutPanelRow .backgroundImageArea' ).each( function(){
	var op = $j(this).closest('.opaqueCalloutPanelRow');
	
	 var opaqueCalloutPanelBGImg = $j(this).find(' .mpContent > img');
        var opaqueCalloutPanelBGImgSrc = $j(opaqueCalloutPanelBGImg).attr('src');
        $j(op).css('background-image', ' url(' + opaqueCalloutPanelBGImgSrc + ')');
        $j(this).closest('.row').css('display','none');
	$j('<div class="opaqueCalloutPanelOverlay"></div>').prependTo(op);
});

$j( '.opaqueCalloutPanelRow .backgroundImageArea .clickToEditDiv' ).each( function(){
    $j(this).closest('.container').append(this);
	$j(this).addClass('backgroundImageAreaCTED');
 });

$j( '.opaqueCalloutPanelRow .container>.row:nth-of-type(2)>div[class*="col-"]:first-of-type .mpContent, .panelsection .panel-copy .mpContent').each( function(){
	$j('> a',this).addClass('abut abutSecondary');
});


$j('img[src$="g_corner.gif"]').attr('alt','');

$j('img[src*="mages/eagle.png"]').next('br').remove();
$j('img[src*="mages/eagle.png"]').next('br').remove();
$j('img[src*="mages/eagle.png"]').next('br').remove();
$j('img[src*="mages/eagle.png"]').next('br').remove();
$j('img[src*="mages/eagle.png"]').next('br').remove();
$j('img[src*="mages/eagle.png"]').next('br').remove();
$j('img[src*="mages/eagle.png"]').next().addClass('eagleNext');
$j('.eagleNext').next().addClass('eagleNextNext');


/*******************
bring in form script when forms are on page
******************/

/*$j('.formBaseFormWrapper').each( function(){
	$j('body.page').append('<script type="text/javascript" src="js/formBlaster.js"></script>' );
});	*/


$j('img').not('[alt]').each( function(){
	$j(this).attr('alt','');
 });


$j('._Telerik_IE9 .navbar-nav > li.dropdown span:empty').remove();