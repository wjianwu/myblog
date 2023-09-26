// $("#show-badge").click(e => {
//     chrome.browserAction.setBadgeText({text: 'new'});
//     chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
// })

// $('#captureScreen').click(e => {
//     // 获取当前窗口 -> 回调函数包括当前窗口的详细信息，如窗口id等
//     chrome.windows.getCurrent(function (win) {
//         // 抓取当前tab的内容
//         chrome.tabs.captureVisibleTab(win.id, {}, function (dataUrl) {
//             const info = {
//                 action: 'CAPTURE_SCREEN',
//                 payload: dataUrl
//             }
//             console.log(info)
//         })
//     })
// })
$(function () {

    const {ref} = Vue;
    const {ElMessage} = ElementPlus;
    let main = {
        setup() {
            let endowmentInsurance = ref('');
            let medicalInsurance = ref('');
            let unemploymentInsurance = ref('');
            let employmentInjuryInsurance = ref('');
            let maternityInsurance = ref('');
            let housingProvidentFund = ref('');

            let dataStr = localStorage.getItem("five-one-storage") ? localStorage.getItem("five-one-storage") : "[]";
            let data = JSON.parse(dataStr);
            let tableData = ref(data);
            const currentRow = ref()
            return {
                endowmentInsurance,
                medicalInsurance,
                unemploymentInsurance,
                employmentInjuryInsurance,
                maternityInsurance,
                housingProvidentFund,
                tableData,
                add: function () {
                    let dataStr = localStorage.getItem("five-one-storage");
                    if (!dataStr) {
                        dataStr = "[]";
                    }
                    let data = JSON.parse(dataStr);
                    data.push({
                        uuid: crypto.randomUUID(),
                        endowmentInsurance: this.endowmentInsurance,
                        medicalInsurance: this.medicalInsurance,
                        unemploymentInsurance: this.unemploymentInsurance,
                        employmentInjuryInsurance: this.employmentInjuryInsurance,
                        maternityInsurance: this.maternityInsurance,
                        housingProvidentFund: this.housingProvidentFund,
                    })
                    tableData.value = data;
                    localStorage.setItem("five-one-storage", JSON.stringify(data));
                    ElMessage({message: 'ADD SUCCESS', type: 'success'});
                    this.clear();

                },
                clear: function () {
                    this.endowmentInsurance = '';
                    this.medicalInsurance = '';
                    this.unemploymentInsurance = '';
                    this.employmentInjuryInsurance = '';
                    this.maternityInsurance = '';
                    this.housingProvidentFund = '';
                },
                handleCurrentChange: function (val) {
                    currentRow.value = val
                },
                handleEdit: (row) => {
                    endowmentInsurance.value = row.endowmentInsurance;
                    medicalInsurance.value = row.medicalInsurance;
                    unemploymentInsurance.value = row.unemploymentInsurance;
                    employmentInjuryInsurance.value = row.employmentInjuryInsurance;
                    maternityInsurance.value = row.maternityInsurance;
                    housingProvidentFund.value = row.housingProvidentFund;
                },
                handleDelete: (row) => {
                    tableData.value = tableData.value.filter(item => {
                        return item.uuid !== row.uuid;
                    });
                    localStorage.setItem("five-one-storage", JSON.stringify(tableData.value));
                    ElMessage({message: 'Delete SUCCESS', type: 'success'});
                }
            };
        },
    }
    const app = Vue.createApp(main);
    app.use(ElementPlus);
    app.mount("#app");
})
