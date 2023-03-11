function Footer() {

  return (
    <div class="footer">
      <div class="fbs-container">
        <h1 class="heading-13">
          FOLLOW&nbsp;
          <a href="https://instagram.com/frombelowstudio" target="_blank" class="link-10">@FROMBELOWSTUDIO</a>
          &nbsp;ON INSTAGRAM
        </h1>

        <div id="sb_instagram" class="sbi sbi_col_4" style={{ width: '100%', paddingBottom: '10px' }} data-id="801759764" data-num="8" data-res="auto" data-cols="4" data-options="{&quot;sortby&quot;: &quot;none&quot;, &quot;showbio&quot;: &quot;false&quot;, &quot;headercolor&quot;: &quot;ebebeb&quot;, &quot;imagepadding&quot;: &quot;5&quot;}" data-sbi-index="0">
          <div class="sb_instagram_header" style={{ padding: '10px', paddingBottom: '0' }}></div>
          <div id="sbi_images" style={{ padding: '5px' }}>
            <div class="sbi_loader fa-spin"></div>
          </div>
          <div id="sbi_load">
            <a class="sbi_load_btn" href="javascript:void(0);">Load More...</a>
            <div class="sbi_follow_btn">
              <a href="https://instagram.com/" target="_blank"><i class="fa fa-instagram"></i> Follow on Instagram</a>
            </div>
          </div>
        </div>

        <div class="text-block-11">© From Below Studio {new Date().getFullYear()}</div>
      </div>
    </div>
  )

}

export default Footer;