function extractDomain(url) {
	var hostname;
	if (url.indexOf("://") > -1) {hostname = url.split('/')[2];}
	else {hostname = url.split('/')[0];}
	hostname = hostname.split(':')[0];
	hostname = hostname.split('?')[0];
	return hostname;
}
function cekantisafelink(){
	var cekantisafelink = new Array();	
	pengaturanSAFELINKKAREEL.DaftarURLantiSafelink = pengaturanSAFELINKKAREEL.DaftarURLantiSafelink;
	cekantisafelink = pengaturanSAFELINKKAREEL.DaftarURLantiSafelink.split(",");
	return cekantisafelink;
}
function convertstr(str) {
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}
if (!pengaturanSAFELINKKAREEL.DaftarURLantiSafelink) {
pengaturanSAFELINKKAREEL.DaftarURLantiSafelink = window.location.href;
}else {
pengaturanSAFELINKKAREEL.DaftarURLantiSafelink += ","+window.location.href;
}
var cekantisafelink = cekantisafelink();
    var periksa = false;
	var no = 0;
	var cekantisafelinklength = cekantisafelink.length;
	var periksalink = "";
	var periksacekantisafelink = "";	
	var linktagMauDiganti = document.getElementsByTagName("a");
	for (var i = 0; i < linktagMauDiganti.length; i++) {	
		periksa = false;
		no = 0;
		while (periksa == false && no < cekantisafelinklength) {
			periksalink = extractDomain(linktagMauDiganti[i].href);
			periksacekantisafelink = extractDomain(cekantisafelink[no]);
			if (periksalink.match(periksacekantisafelink)) {
				periksa = true;
			}
			no++;
		}
		if (periksa == false) {
		var urlakandiENCODE = convertstr(linktagMauDiganti[i].href);
			linktagMauDiganti[i].href = pengaturanSAFELINKKAREEL.APIurlGenerateSafelink+'#'+window.btoa(unescape(encodeURIComponent(pengaturanSAFELINKKAREEL.kodeAPIvalid+'#'+urlakandiENCODE+'#'+pengaturanSAFELINKKAREEL.passwordLINK+'#'+pengaturanSAFELINKKAREEL.judulLINK)));
			linktagMauDiganti[i].rel = "nofollow";
			linktagMauDiganti[i].target = "_blank";
		}
	}
