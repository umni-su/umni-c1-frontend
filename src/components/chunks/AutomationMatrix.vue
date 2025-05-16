<script>
import {createErrorNotification} from "@/helpers/notificationHelper.js";

export default {
  name: "AutomationMatrix",
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  emits: ['update:model-value'],
  data() {
    return {
      matrix: []
    }
  },
  computed: {
    doSettings() {
      return this.$store.getters['getDoSettings']
    },
  },
  watch: {
    matrix: {
      deep: true,
      handler() {
        if (this.matrix.length === 0) {
          this.add()
          this.$emit('update:model-value', this.matrix)
        }
      }
    }
  },
  created() {
    this.matrix = this.modelValue
  },
  methods: {
    chipTitle(m) {
      const doSettingsIndex = this.doSettings?.findIndex(s => s.index === m.rel)
      if (doSettingsIndex > -1) {
        return this.doSettings[doSettingsIndex]?.label
          ? this.doSettings[doSettingsIndex].label
          : this.$t('Relay #{index}', {index: this.doSettings[doSettingsIndex].index})
      } else {
        return this.$t('Empty')
      }
    },
    add() {
      if (this.matrix.length < 6) {
        this.matrix.push({
          val: 1,
          rel: 1,
          inv: false,
          state: 1
        })
      } else {
        this.$store.commit('addNotification', createErrorNotification(this.$t('You can not add more then six records')));
      }
    },
    deleteMatrixRule(index) {
      this.matrix = this.matrix.filter((rule, _index) => index !== _index)
    }
  }
}
</script>

<template>
  <VCard
    v-for="(m, i) in matrix"
    key="m"
    class="mb-2"
  >
    <template #text>
      <VTextField
        v-model.number="m.val"
        min="0"
        type="number"
        :hide-details="false"
        autocomplete="off"
        class="mb-2"
        :label="$t('Value')"
      >
        <template #append>
          <VBtn
            icon="mdi-plus"
            variant="text"
            density="comfortable"
            @click="add"
          />
          <VBtn
            icon="mdi-close"
            class="ml-2"
            color="red"
            variant="text"
            density="comfortable"
            @click="deleteMatrixRule(i)"
          />
        </template>
        <template #details>
          <VTooltip>
            <template #activator="{props}">
              <VChip
                class="mr-2"
                v-bind="props"
                variant="tonal"
                prepend-icon="mdi-exclamation-thick"
                :text="$t('Inverse')"
                density="compact"
                :active="m.inv"
                :color="m.inv ? 'primary' : 'default'"
                @click="m.inv = !m.inv"
              />
            </template>
            {{ $t('Invert the state when triggered again') }}
          </VTooltip>
          <VMenu
            location="right"
            :close-on-content-click="false"
          >
            <template #activator="{props}">
              <VChip
                density="compact"
                variant="tonal"
                color="primary"
                class="mr-2"
                v-bind="props"
                :text="chipTitle(m)"
              />
            </template>
            <VList selectable>
              <VListItem
                v-for="(relay) in doSettings"
                :key="relay.index"
                rounded="0"
                density="compact"
                @click="m.rel = relay.index"
              >
                <template #title>
                  {{ relay?.label ? relay.label : $t('Relay #{index}', {index: relay.index}) }}
                </template>
              </VListItem>
            </VList>
          </VMenu>
        </template>
        <template #append-inner>
          <VChipGroup
            v-model="m.state"
            density="comfortable"
          >
            <VChip
              variant="tonal"
              color="success"
              :value="1"
              :text="$t('On')"
            />
            <VChip
              variant="tonal"
              color="error"
              :value="0"
              :text="$t('Off')"
            />
          </VChipGroup>
        </template>
      </VTextField>
    </template>
  </VCard>
</template>

<style scoped lang="scss">

</style>
