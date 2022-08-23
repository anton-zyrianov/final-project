<template>
  <footer>
    <div class="footer-section">
      <div class="footer-logo">
        <img src="https://play-lh.googleusercontent.com/PH-2iORSfQs-iizoHzePXBaJCXml443pgoC14-lZESLFIp78A4SvxLKUVv1FyIQFtC8" alt="Logo ToDo App">
      </div>
      <div class="footer-separador"></div>
      <div class="footer-text">
        <div class="footer-logo">
          <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/84/original/logo-ironhack-blue.png" alt="Logo Ironhack">
        </div>
        <p>Ironhack {{ year }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import moment from 'moment'

const year = moment().format('YYYY')

</script>

<style scoped>

.footer-section{
  text-align: center;
}

.footer-logo img{
  width: 50px;
}

.footer-separador{
  border-top: 1px solid rgb(48, 49, 52, 0.1);
  height: 2px;

}

.footer-text{
  color: #303134;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.footer-text p{
  margin-left: 10px;
}

.footer-text .footer-logo{
  margin-right: 10px;
}

</style>
