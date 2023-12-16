<template>
  <main class="flex flex-col justify-center items-center h-screen px-4">
    <h1 class="text-5xl font-bold text-center">Unit Converter</h1>
    <p class="text-3xl text-center">Select the measurement units you want to convert</p>
    <div
      class="flex justify-center items-center w-screen text-4xl gap-3 mt-16 flex-col sm:flex-row"
    >
      <div>
        <div class="text-black relative">
          <div class="relative">
            <input type="text" class="rounded-md pl-4 pr-12 py-1 w-48 text-center" v-model="firstLabelValue" @focus="setShowFirstOptions" @blur="setShowFirstOptions" />
            <span class="rotate-90 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none cursor-pointer">&rang;</span>
          </div>
          <div id="first-options" class="bg-white text-lg rounded-xl mt-3 absolute w-full z-20" v-show="showFirstOptions">
            <button
              v-for="(option, index) in options"
              :key="index"
              class="block w-full text-left px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-200"
            >{{ option.name }}</button>
          </div>
        </div>
        <div class="relative mt-4">
          <input
            id="first-input"
            ref="firstInput"
            type="text"
            class="border-black border-2 rounded-md pl-4 pr-12 py-1 text-black w-48 text-center"
            v-model="firstInputValue"
            @input="handleFirstInput"
          />
          <button
            @click="copyValueFirstInput"
            class="absolute z-10 right-3 top-1/2 -translate-y-1/2 bg-slate-300 p-2 rounded-3xl shadow-md"
            title="Copy"
          >
            <img src="./assets/img/icons/copy.svg" class="w-5 hover:scale-110" />
          </button>
          <span
            v-show="showMessageCopiedFirstInput"
            class="absolute bg-red-400 text-xs whitespace-nowrap p-1 rounded-xl right-14 top-1/2 -translate-y-1/2"
            >Value copied</span
          >
        </div>
      </div>
      <button class="cursor-pointer w-8 h-8 rounded-md bg-slate-800 flex justify-center items-center shadow-slate-300 shadow-2xl" title="Reverse">
        <img src="./assets/img/icons/swap.svg" class="w-5 rotate-90 sm:rotate-0 hover:scale-110" />
      </button>
      <div>
        <div class="text-black relative">
          <div class="relative">
            <input type="text" class="rounded-md pl-4 pr-12 py-1 w-48 text-center" v-model="secondLabelValue" @focus="setShowSecondOptions" @blur="setShowSecondOptions" />
            <span class="rotate-90 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none cursor-pointer">&rang;</span>
          </div>
          <div id="second-options" class="bg-white text-lg rounded-xl mt-3 absolute w-full z-20" v-show="showSecondOptions">
            <button
              v-for="(option, index) in options"
              :key="index"
              class="block w-full text-left px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-200"
            >{{ option.name }}</button>
          </div>
        </div>
        <div class="relative mt-4">
          <input
            id="second-input"
            ref="secondInput"
            type="text"
            class="border-black border-2 rounded-md pl-4 pr-12 py-1 text-black w-48 text-center"
            v-model="secondInputValue"
            @input="handleSecondInput"
          />
          <button
            @click="copyValueSecondInput"
            class="absolute z-10 right-3 top-1/2 -translate-y-1/2 bg-slate-300 p-2 rounded-3xl shadow-md"
            title="Copy"
          >
            <img src="./assets/img/icons/copy.svg" class="w-5 hover:scale-110" />
          </button>
          <span
            v-show="showMessageCopiedSecondInput"
            class="absolute bg-red-400 text-xs whitespace-nowrap p-1 rounded-xl right-14 top-1/2 -translate-y-1/2"
            >Value copied</span
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      firstInputValue: "",
      secondInputValue: "",
      showMessageCopiedFirstInput: false,
      showMessageCopiedSecondInput: false,
      showFirstOptions: false,
      showSecondOptions: false,
      firstLabelValue: "",
      secondLabelValue: "",
      options: [
        {
          name: 'Pixels',
          conversion_rate: 1
        },
        {
          name: 'REM',
          conversion_rate: 0.0625
        },
        {
          name: 'EM',
          conversion_rate: 0.0625
        },
        {
          name: 'cm',
          conversion_rate: 0.0264583333
        },
        {
          name: 'mm',
          conversion_rate: 0.2645833333
        },
        {
          name: 'pt',
          conversion_rate: 0.75
        },
      ]
    };
  },
  created() {
    this.firstLabelValue = this.options[0].name
    this.secondLabelValue = this.options[1].name
  },
  methods: {
    handleFirstInput() {
      this.firstInputValue = `${this.firstInputValue}`
        .replace(/[^0-9.,]/g, "")
        .replace(",", ".");
      const dotCount = this.firstInputValue.split(".").length - 1;
      if (dotCount > 1) {
        this.firstInputValue = this.firstInputValue.slice(0, -1);
      }
      const fisrtConversionRate = this.options.find(option => option.name === this.firstLabelValue).conversion_rate
      const secondConversionRate = this.options.find(option => option.name === this.secondLabelValue).conversion_rate
      this.secondInputValue = +parseFloat(
        Number(this.firstInputValue) / fisrtConversionRate * secondConversionRate
      ).toFixed(3);
    },
    handleSecondInput() {
      this.secondInputValue = `${this.secondInputValue}`
        .replace(/[^0-9.,]/g, "")
        .replace(",", ".");
      const dotCount = this.secondInputValue.split(".").length - 1;
      if (dotCount > 1) {
        this.secondInputValue = this.secondInputValue.slice(0, -1);
      }
      const fisrtConversionRate = this.options.find(option => option.name === this.firstLabelValue).conversion_rate
      const secondConversionRate = this.options.find(option => option.name === this.secondLabelValue).conversion_rate
      this.firstInputValue = +parseFloat(
        Number(this.secondInputValue) * fisrtConversionRate / secondConversionRate
      ).toFixed(3);
    },
    copyValueFirstInput() {
      navigator.clipboard.writeText(this.firstInputValue);
      this.showMessageCopiedFirstInput = true;
      setTimeout(() => {
        this.showMessageCopiedFirstInput = false;
      }, 2000);
    },
    copyValueSecondInput() {
      navigator.clipboard.writeText(this.secondInputValue);
      this.showMessageCopiedSecondInput = true;
      setTimeout(() => {
        this.showMessageCopiedSecondInput = false;
      }, 2000);
    },
    setShowFirstOptions(target) {
      if (target?.relatedTarget?.parentElement?.id === 'first-options') {
        this.firstLabelValue = target.relatedTarget.innerText
      }
      const isAValidValue = this.options.some(unit => unit.name === this.firstLabelValue);
      if (!isAValidValue) {
        const completeText = this.options.find(option => option.name.startsWith(this.firstLabelValue))
        if (completeText) {
          this.firstLabelValue = completeText.name
        } else {
          this.firstLabelValue = this.options[0].name
        }
      }
      this.showFirstOptions = !this.showFirstOptions;
      this.handleSecondInput()
    },
    setShowSecondOptions(target) {
      if (target?.relatedTarget?.parentElement?.id === 'second-options') {
        this.secondLabelValue = target.relatedTarget.innerText
      }
      const isAValidValue = this.options.some(unit => unit.name === this.secondLabelValue);
      if (!isAValidValue) {
        const completeText = this.options.find(option => option.name.startsWith(this.secondLabelValue))
        if (completeText) {
          this.secondLabelValue = completeText.name
        } else {
          this.secondLabelValue = this.options[0].name
        }
      }
      this.showSecondOptions = !this.showSecondOptions;
      this.handleFirstInput()
    }
  },
};
</script>

<style></style>
