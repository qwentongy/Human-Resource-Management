<template>
  <div>
    <a-card style="width: 98%; margin: 1%">
      <vxe-table
        border
        :align="allAlign"
        :data="tableData"
        :seq-config="{ seqMethod }"
      >
        <vxe-column type="seq" title="序号" align="center" width="100"></vxe-column>
        <vxe-column field="name" title="姓名" align="center"></vxe-column>
        <vxe-column field="sex" title="性别" align="center"></vxe-column>
        <vxe-column field="age" title="年龄" align="center"></vxe-column>
      </vxe-table>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allAlign: null,
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women",
          age: 24,
          address: "Shanghai",
        },
      ],
      columns: [],
    };
  },
  methods: {
    seqMethod({ row }) {
      return `No.${row.id}`
    }
  },
};
</script>

<style></style>
