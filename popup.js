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
            let yearList = [2023, 2022, 2021, 2020].map(item => {
                return {value: item, label: item}
            })
            let monthList = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(item => {
                return {value: item, label: item}
            })
            let mainObj = ref({
                uuid: ref(''),
                year: ref(''),
                month: ref(''),

                endowmentInsurance: ref(''),
                medicalInsurance: ref(''),
                unemploymentInsurance: ref(''),
                employmentInjuryInsurance: ref(''),
                maternityInsurance: ref(''),
                housingProvidentFund: ref(''),

                endowmentInsuranceCompany: ref(''),
                medicalInsuranceCompany: ref(''),
                unemploymentInsuranceCompany: ref(''),
                employmentInjuryInsuranceCompany: ref(''),
                maternityInsuranceCompany: ref(''),
                housingProvidentFundCompany: ref('')
            });
            let dataStr = localStorage.getItem("five-one-storage") ? localStorage.getItem("five-one-storage") : "[]";
            let data = JSON.parse(dataStr);
            let tableData = ref(data);
            const currentRow = ref();
            const drawer = ref(false)
            return {
                mainObj,
                tableData,
                yearList,
                monthList,
                drawer,
                openDraw: function () {
                    this.drawer = true;
                },
                closeDraw: function () {
                    this.clear();
                    this.drawer = false;
                },
                addOrUpdate: function () {
                    if (mainObj.value.uuid === "") {
                        let dataStr = localStorage.getItem("five-one-storage") ? localStorage.getItem("five-one-storage") : "[]";
                        let data = JSON.parse(dataStr);
                        data.push({
                            uuid: crypto.randomUUID(),
                            year: this.mainObj.year,
                            month: this.mainObj.month,

                            endowmentInsurance: this.mainObj.endowmentInsurance,
                            medicalInsurance: this.mainObj.medicalInsurance,
                            unemploymentInsurance: this.mainObj.unemploymentInsurance,
                            employmentInjuryInsurance: this.mainObj.employmentInjuryInsurance,
                            maternityInsurance: this.mainObj.maternityInsurance,
                            housingProvidentFund: this.mainObj.housingProvidentFund,

                            endowmentInsuranceCompany: this.mainObj.endowmentInsuranceCompany,
                            medicalInsuranceCompany: this.mainObj.medicalInsuranceCompany,
                            unemploymentInsuranceCompany: this.mainObj.unemploymentInsuranceCompany,
                            employmentInjuryInsuranceCompany: this.mainObj.employmentInjuryInsuranceCompany,
                            maternityInsuranceCompany: this.mainObj.maternityInsuranceCompany,
                            housingProvidentFundCompany: this.mainObj.housingProvidentFundCompany,
                        })
                        tableData.value = data;
                        localStorage.setItem("five-one-storage", JSON.stringify(data));
                        ElMessage({message: '添加成功', type: 'success'});
                    } else {
                        let temp = JSON.parse(localStorage.getItem("five-one-storage"));
                        temp.map(item => {
                            if (item.uuid === mainObj.value.uuid) {
                                item.year = this.mainObj.year;
                                item.month = this.mainObj.month;

                                item.endowmentInsurance = this.mainObj.endowmentInsurance;
                                item.medicalInsurance = this.mainObj.medicalInsurance;
                                item.unemploymentInsurance = this.mainObj.unemploymentInsurance;
                                item.employmentInjuryInsurance = this.mainObj.employmentInjuryInsurance;
                                item.maternityInsurance = this.mainObj.maternityInsurance;
                                item.housingProvidentFund = this.mainObj.housingProvidentFund;

                                item.endowmentInsuranceCompany = this.mainObj.endowmentInsuranceCompany;
                                item.medicalInsuranceCompany = this.mainObj.medicalInsuranceCompany;
                                item.unemploymentInsuranceCompany = this.mainObj.unemploymentInsuranceCompany;
                                item.employmentInjuryInsuranceCompany = this.mainObj.employmentInjuryInsuranceCompany;
                                item.maternityInsuranceCompany = this.mainObj.maternityInsuranceCompany;
                                item.housingProvidentFundCompany = this.mainObj.housingProvidentFundCompany;
                            }
                        })
                        tableData.value = temp;
                        localStorage.setItem("five-one-storage", JSON.stringify(temp));
                        ElMessage({message: '修改成功', type: 'success'});
                    }
                    this.closeDraw();
                },
                clear: function () {
                    this.mainObj.uuid = '';

                    this.mainObj.endowmentInsurance = '';
                    this.mainObj.medicalInsurance = '';
                    this.mainObj.unemploymentInsurance = '';
                    this.mainObj.employmentInjuryInsurance = '';
                    this.mainObj.maternityInsurance = '';
                    this.mainObj.housingProvidentFund = '';

                    this.mainObj.endowmentInsuranceCompany = '';
                    this.mainObj.medicalInsuranceCompany = '';
                    this.mainObj.unemploymentInsuranceCompany = '';
                    this.mainObj.employmentInjuryInsuranceCompany = '';
                    this.mainObj.maternityInsuranceCompany = '';
                    this.mainObj.housingProvidentFundCompany = '';
                },
                handleCurrentChange: function (val) {
                    currentRow.value = val
                },
                handleEdit: function (row) {
                    this.openDraw();
                    mainObj.value.uuid = row.uuid;
                    mainObj.value.year = row.year;
                    mainObj.value.month = row.month;

                    mainObj.value.endowmentInsurance = row.endowmentInsurance;
                    mainObj.value.medicalInsurance = row.medicalInsurance;
                    mainObj.value.unemploymentInsurance = row.unemploymentInsurance;
                    mainObj.value.employmentInjuryInsurance = row.employmentInjuryInsurance;
                    mainObj.value.maternityInsurance = row.maternityInsurance;
                    mainObj.value.housingProvidentFund = row.housingProvidentFund;

                    mainObj.value.endowmentInsuranceCompany = row.endowmentInsuranceCompany;
                    mainObj.value.medicalInsuranceCompany = row.medicalInsuranceCompany;
                    mainObj.value.unemploymentInsuranceCompany = row.unemploymentInsuranceCompany;
                    mainObj.value.employmentInjuryInsuranceCompany = row.employmentInjuryInsuranceCompany;
                    mainObj.value.maternityInsuranceCompany = row.maternityInsuranceCompany;
                    mainObj.value.housingProvidentFundCompany = row.housingProvidentFundCompany;
                },
                handleDelete: function (row) {
                    tableData.value = tableData.value.filter(item => {
                        return item.uuid !== row.uuid;
                    });
                    localStorage.setItem("five-one-storage", JSON.stringify(tableData.value));
                    ElMessage({message: '删除成功', type: 'success'});
                },
                getSummaries: function (param) {
                    const {columns, data} = param;
                    const sums = [];
                    columns.forEach((column, index) => {
                        if (index === 0) {
                            sums[index] = '合计'
                            return
                        }
                        if (index === columns.length - 1) {
                            sums[index] = ''
                            return
                        }

                        const values = data.map((item) => Number(item[column.property]))
                        const valuesCompany = data.map((item) => Number(item[column.property + "Company"]))

                        let total = 'N/A';
                        if (!values.every((value) => Number.isNaN(value))) {
                            total = values.reduce((prev, curr) => {
                                const value = Number(curr)
                                return Number.isNaN(value) ? prev : (prev + curr);
                            })
                        }

                        let totalCompany = 'N/A';
                        if (!valuesCompany.every((value) => Number.isNaN(value))) {
                            totalCompany = valuesCompany.reduce((prev, curr) => {
                                const value = Number(curr)
                                return Number.isNaN(value) ? prev : (prev + curr);
                            })
                        }
                        sums[index] = total + '+' + totalCompany + "=" + (total + totalCompany);
                    })
                    return sums
                }
            };
        },
    }
    const app = Vue.createApp(main);
    app.use(ElementPlus);
    app.mount("#app");
})
