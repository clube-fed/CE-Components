<script src="##SITEPATH##/A_Master/library/js/overridePhotoAlbum.js"></script>
<script>
function MiniPageMouseout(){ return false; }
function MiniPageMouseover(){ return false; }

//imageBG
function ImgBG(e){for(var r=e.trim().split(/\s*,\s*/),l=0;l<r.length;l++)for(var t=document.querySelectorAll(r[l]),n=0;n<t.length;n++){var a=t[n].getElementsByTagName("*"),g=!1;if(a.length>0)for(var o=0;o<a.length;o++){var s=a[o].nodeName;"IMG"==s&&0==g&&(t[n].style.backgroundImage="url("+a[o].src+")",a[o].style.display="none",g=!0)}}}
ImgBG('.mp-bg > .mpContent');

//loader
$j(window).load(function(){
  $j('.loadBox').addClass('loaded');
});

//nav-basic for main and subnav
$j('.nav-offcanvas ul.level0, .nav-utility > ul').addClass('ul-basic clearfix');
$j('body.page').addClass('offcanvas offcanvas-right');
$j('[data-toggle="offcanvas"], [data-toggle="offcanvas-close"], .nav-modal').click(function () {
    $j('.offcanvas').toggleClass('open-shelf');
  });
//WRAPPING LINKS THAT ARE FOLDERS
$j('.nav-offcanvas li.ulMenuItem, .sub-menu ul > li').each(function(){
     $j(this).contents().filter(function(){
      return this.nodeType === 3; // Node.TEXT_NODE
      }).wrap('<a href="#" class="link-off"></a>');
    });

$j('.nav-offcanvas .ulMenu.level0').find('.ulMenu').addClass('dropdown-menu').attr('role','menu');
$j('.dropdown-menu').parent().children('a').append('<span class="dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></span>');
$j('.dropdown-menu').parent('li.ulMenuItem.level1').addClass('dropdown');
$j('.dropdown-menu').parent('li.ulMenuItem.level2').addClass('dropdown dropdown-submenu');
$j('[data-toggle=dropdown]').on('click', function(event) {
  // Avoid following the href location when clicking
  event.preventDefault();
  // Avoid having the menu to close when clicking
  event.stopPropagation();
  // Re-add .open to parent sub-menu item
  $j(this).parent().parent().toggleClass('open');
  //$j(this).parent().parent().find('ul').parent().find('li.dropdown').addClass('open');
});

$j('#content .mpContent img').addClass('img-responsive');
$j('.adminbar').parent().parent().parent().addClass('adminbar-wrap');
$j('.module-wrap img[src*="1x1"]').css('opacity',0);
$j('.footer ul.level0').addClass('ul-basic ul-hz');

//sidemenu
//panelbar0
$j('.side-menu ul.level1').parent().addClass('open-panel');
$j('.side-menu li.ulMenuItem.level1').each(function(){
  $j(this).contents().filter(function(){
    return this.nodeType === 3 // Node.TEXT_NODE
  }).wrap('<a href="#" class="link-off"></a>');
});
$j('.open-panel > a').after('<span class="submenu-toggle"><span class="caret"></span></span>');
$j('.open-panel > a + .submenu-toggle').click(function(e){
  e.preventDefault();
  $j(this).parent().toggleClass('opened');
  $j(this).parent().children('ul.level1').slideToggle();
});

// $j(document).ready(function(){
//   runBigBG();
// });
//
//
//   function bigBG () {
//   var imgWrap = $j('.page-banner');
//   var img = $j('.page-banner > .mpContent > img');
//   var imgSrc = $j(img).attr('src');
//
//   //DO STUFF
//   $j(imgWrap).addClass('hasImg bigBG').css('background-image', 'url(' + imgSrc + ')');
//   $j(img).remove();
//   }
//
//   function runBigBG () {
//    if ($j('.page-banner .mpContent > img').length) {
//     bigBG();
//     }
//   else {
//     $j('.page-banner').addClass('no-media');
//   	//$j('header').css('position','relative');
//
//   }
//   }

//Hamburgers
// var $jhamburger = $j('.hamburger');
//   $jhamburger.on('click', function(e) {
//   $jhamburger.toggleClass('is-active');
//   // Do something else, like open/close menu
// });


//using scroll to responsify tabs




function responsiveTabs(display) {
  	//set the window
  	var displayWidth = $j('table[id$="tblTop"]').outerWidth();
    $j(display).css('width',displayWidth);
  	var tabs = $j('.RadTabStrip_Tab_responsive .levelwrap.level1 > ul > li');
	  var listWrap = $j('.RadTabStrip_Tab_responsive .levelwrap.level1 > ul');
	  var listWidth = 0;
  	//set width of UL
  	//console.log(tabs);
  	for (i=0; i<tabs.length;i++) {
    	var tabsWidth = $j(tabs[i]).outerWidth() + 4; //bc inline block
  		listWidth += tabsWidth//display-inline block
  	}

	  //console.log(listWidth + 'listwidth calc');
  	$j(listWrap).width(listWidth);

	   if(displayWidth-40 < listWidth) {
  		// console.log(listWidth);
  		// console.log(displayWidth-40);
    	$j('.tab-scroll-txt').addClass('active');
	   } else {
  		// console.log('remove');
  		// console.log(listWidth);
  		$j('.tab-scroll-txt').removeClass('active');
	   }
}

if($j('#content').find('.tabstrip').length > 0) {
  var tabsDisplay = $j('.RadTabStrip_Tab_responsive .levelwrap.level1');
	//append instruction
	$j('.tabstrip').parent().prepend('<div class="tab-scroll-txt">Scroll for more <em class="nc-icon-glyph arrows-1_tail-right"></em></div>');
	//initialize
	responsiveTabs(tabsDisplay);

	$j(window).resize(function () {
     responsiveTabs(tabsDisplay);
 	});
}

//global toggles
<!-- Global Script expand and Toggle Click to Edits-->
$j('.GS-toggle').on('click', function () {
    $j('.global-scripts').toggleClass('minimized')
});
$j('#toggle-edits').change(function () {
    if (!this.checked) {
        //  ^
           $j('.clickToEditDiv').show();
           $j( 'img[title="Click to edit Plugin Properties"]' ).parentsUntil( 'table' ).show();
      	$j('img[title="Click to edit navigation properties"]').parentsUntil('div').show();
        } else {
            $j('.clickToEditDiv').hide();
  $j('img[title="Click to edit navigation properties"]').parentsUntil('div').hide();
            $j( 'img[title="Click to edit Plugin Properties"]' ).parentsUntil( 'table' ).hide();
}
});

//js override for nav icons
$j("div[style*='text-align:Right']").addClass('nav--editor').css({
float: 'right',
position: 'relative',
right: 0,
top: 12+'px'
});

//fixed header

var header = $j('.brand');
var scrolled = false;

$j(window).scroll(function () {
     if (120 < $j(window).scrollTop() && !scrolled) {
       header.addClass('fixed').css('top',0+'px'); //.animate({ top: '0px' })
       $j('#content').css('padding-top',120+'px');
       scrolled = true;
     }

     if (120 > $j(window).scrollTop() && scrolled) {
       header.removeClass('fixed').removeAttr('style');
       $j('#content').removeAttr('style');
       scrolled = false;
        }
 });


//panel script
// function panelBG(img) {
//  var parent = $j(img).parents('.panel-img');
//  console.log(parent);
//  var imgSrc = $j(img).attr('src');
//  $j(parent).addClass('hasImg bigBG').css('background-image', 'url(' + imgSrc + ')');
//  $j(img).remove();
// }
//
// if($j('.panel-wrap').length) {
// $j('.panel-wrap .clearfix').each(function(){
//     var img = $j(this).find('.panel-img .mpContent > img');
//     panelBG(img);
// });
// }

</script>
