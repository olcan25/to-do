# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


#Bu projede kullanilan Tekbnolojiler
-Vue Router(Router)
-Pinia (State Managment)
-Tailwind CSS (Style)
=Firebase (Database)
-vue-toastification
-@vorms/core (React Hook Form benzeri bir yapi)
-@vorms/resolerver(Bu Zod ve Yup validationlar icin kullaniliyor)
-Yup (Validation)

#Bu projede yapilan islemeler:
1. Firebase uzerinde ekleme, silme, veri getirme ve duzneleme (sadece isDone duzenleme) islemleri yapildi.
2. Custom componentler uzerinde props islemeler yapildi
    - TodoAddButton burda Button tipi submit yapilarak "@vorms/core" handleSubmit olarak ekleme islemi yapilir.
    - TodoFooter ile bulunan Tumunu sil ise ID tek tek ile silini Toplu(Batch) silme islemi bulunamadi.
    - TodoInput'ta ise Custom Component uzerinde v-model islemi yapildi title ile component uzerinde parent-child ve child-parent islemi yapildi.
    - TodoList ise Custom Component ile v-for ile tek tek datalari gonderdim.
    - TodoErrorMessage ise "@vorms/core" daki register ile alinan title'lin error ozelligini (errorTitle), bu componente gondererek v-if ile bunun hata denetimini kullandim.
        : Validasyon islemleri icin Yup kulladndim once bir schema olusturdum bu semayi ise yupResolver parametre olarak kullandrak bunu useForm ile validate gonderdim.
3. State Managment ise Pinia kullandim burda actionlar icine Firebase ekleme, silme, veri getirme ve duzeneleme islemlerini bunun icinde yaptim.
4. Stil islemleri olarak Tailwind uzerinden aldim ve birinin tasarladigi todo yu alip birkac degisiklik yaptim.(Kimden alintiladigim bulamadim eger bulursam paylasirim).
5. Router islemi olarak Vue-Router kullandim ve ToDo ileriki versiyonlarinde detail olarkta bir component olusturmayi dusunuyorum sadece TodoList var.
